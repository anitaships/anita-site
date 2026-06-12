import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/resources/agent-knowledge";

export const runtime = "nodejs";

const MAX_MESSAGES = 12; // keep the context short & cheap
const MAX_LEN = 1500; // cap each message length

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const raw = (body as { messages?: unknown })?.messages;
  const messages: ChatMessage[] = (Array.isArray(raw) ? raw : [])
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_LEN) }));

  if (messages.length === 0) {
    return new Response("No messages", { status: 400 });
  }

  const key = process.env.DEEPSEEK_API_KEY;

  // No key configured -> stay graceful (this should never reach a recruiter,
  // since the widget is gated off in production until the key is set).
  if (!key) {
    return streamText(
      "Thanks for reaching out! The assistant is being set up right now. In the meantime, you can reach Anita directly at anitaliu0818@gmail.com.",
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        stream: true,
        temperature: 0.2, // low temp -> stays grounded, less embellishment
        max_tokens: 600,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });
  } catch {
    return streamText(
      "Sorry, I'm having trouble connecting right now. You can reach Anita directly at anitaliu0818@gmail.com.",
    );
  }

  if (!upstream.ok || !upstream.body) {
    return streamText(
      "Sorry, I'm having trouble right now. You can reach Anita directly at anitaliu0818@gmail.com.",
    );
  }

  // Transform DeepSeek's SSE stream into a plain-text token stream for the client.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const data = t.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // ignore keep-alive / partial lines
            }
          }
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function streamText(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
