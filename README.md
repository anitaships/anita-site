# Anita Liu — Personal Site

> Where others see chaos, I build order.

The personal site of **Anita Liu**, a Growth & Product Operations practitioner in cross-border, AI-native e-commerce.

🔗 **Live:** [anitaliu.vercel.app](https://anitaliu.vercel.app)

## About this site

This is more than a portfolio — it's a working artifact. I build and ship it the same way I work day to day: **AI-native**, using Claude Code as a pair-builder, treating prompts and components as reusable tools rather than one-off tasks. The site itself is the proof of how I operate.

Highlights:

- **AI-native build** — designed, written, and iterated with Claude Code
- **"Ask my work" agent** — an embedded chat agent that answers questions about my experience
- **Motion with restraint** — scroll-reveal and cursor-spotlight interactions, kept subtle and accessible (`prefers-reduced-motion` respected)
- **Design-system first** — built on Once UI tokens for consistent spacing, color, and type

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Once UI](https://once-ui.com) design system
- TypeScript
- Deployed on [Vercel](https://vercel.com)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

| Path | What's there |
|------|--------------|
| `src/resources/content.tsx` | Almost all site copy |
| `src/resources/once-ui.config.ts` | Theme, routes, SEO config |
| `src/app/work/projects/` | Case studies (MDX) |
| `src/components/` | Custom components (Reveal, SpotlightCard) |

---

Built on the [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) template by [Once UI](https://once-ui.com) (CC BY-NC 4.0).
