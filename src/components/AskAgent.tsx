"use client";

import { useEffect, useRef, useState } from "react";
import { RiCloseLine, RiArrowUpLine } from "react-icons/ri";
import { Cat } from "./Cat";
import styles from "./AskAgent.module.scss";

type Msg = { role: "user" | "assistant"; content: string };

// Strip Markdown the chat can't render (the model sometimes ignores the prompt).
// Runs on the full accumulated string, so it's safe even when ** is split across chunks.
function clean(s: string): string {
  return s
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-•]\s+/gm, "");
}

const PRESETS = [
  "What are Anita's strongest skills?",
  "What projects has she shipped?",
  "Why is she a fit for a growth role?",
];

export function AskAgent() {
  // Gate the widget: only render where it's explicitly turned on (set
  // NEXT_PUBLIC_ASK_AGENT=on). Keeps a half-configured chat off the public site.
  if (process.env.NEXT_PUBLIC_ASK_AGENT !== "on") return null;
  return <AskAgentWidget />;
}

function AskAgentWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Proactive greeting bubble pops up a few seconds after load (boosts clicks).
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setShowBubble(true), 4500);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");

    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error("request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: clean(acc) }]);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. You can reach Anita at anitaliu0818@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {!open && (
        <div className={styles.launcher}>
          {showBubble && (
            <button
              type="button"
              className={styles.bubble}
              onClick={() => setOpen(true)}
            >
              Hi 🐾 Ask me about Anita
              <span
                className={styles.bubbleClose}
                role="button"
                aria-label="Dismiss"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
              >
                <RiCloseLine />
              </span>
            </button>
          )}
          <button
            type="button"
            aria-label="Ask about Anita's work"
            className={styles.catBtn}
            onClick={() => setOpen(true)}
          >
            <Cat pose="lying" size={116} />
          </button>
        </div>
      )}

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Ask about Anita's work">
          <header className={styles.head}>
            <div className={styles.title}>
              <span className={styles.headCat}>
                <Cat pose="sitting" size={28} follow={false} />
              </span>
              Ask about my work
            </div>
            <button
              type="button"
              aria-label="Close"
              className={styles.iconBtn}
              onClick={() => setOpen(false)}
            >
              <RiCloseLine />
            </button>
          </header>

          <div className={styles.body} ref={scrollRef}>
            {messages.length === 0 ? (
              <div className={styles.intro}>
                <p>
                  Hi — I'm Anita's AI assistant. Ask me anything about her work,
                  projects, or what she's looking for.
                </p>
                <div className={styles.presets}>
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={styles.preset}
                      onClick={() => send(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`${styles.msg} ${
                    m.role === "user" ? styles.user : styles.assistant
                  }`}
                >
                  {m.content || (
                    <span className={styles.typing}>
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          <div className={styles.inputRow}>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              placeholder="Ask anything…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              type="button"
              aria-label="Send"
              className={styles.send}
              disabled={!input.trim() || loading}
              onClick={() => send(input)}
            >
              <RiArrowUpLine />
            </button>
          </div>
          <div className={styles.disclaimer}>AI assistant · answers from Anita's real experience</div>
        </div>
      )}
    </>
  );
}
