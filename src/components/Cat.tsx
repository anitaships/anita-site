"use client";

import { useEffect, useRef } from "react";
import styles from "./Cat.module.scss";

// Original hand-drawn black kitty mascot, two poses:
//  - "lying"   : lazy curled-up black cat with a big hooked tail — the idle
//                launcher (winks, tail flicks, open eye's pupil tracks the cursor).
//  - "sitting" : big-eyed chibi with paws up + a bell — shown when chat is open
//                (its eyes follow the cursor).
// Pure SVG + CSS + a tiny mousemove handler. No deps.
export function Cat({
  pose = "lying",
  size = 116,
  follow = true,
}: {
  pose?: "lying" | "sitting";
  size?: number;
  follow?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!follow) return;
    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 320));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 320));
      el.style.setProperty("--px", `${dx * 2.2}px`);
      el.style.setProperty("--py", `${dy * 1.8}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [follow]);

  if (pose === "sitting") {
    return (
      <svg
        ref={ref}
        className={styles.sit}
        width={size}
        height={(size * 112) / 120}
        viewBox="0 0 120 112"
        aria-hidden="true"
      >
        <defs>
          <filter id="glowSit" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#7fe3c0" floodOpacity="0.5" />
          </filter>
        </defs>
        <g filter="url(#glowSit)">
          <path d="M30 30 L22 4 L50 20 Z" fill="#0b0b0d" />
          <path d="M90 30 L98 4 L70 20 Z" fill="#0b0b0d" />
          <path d="M18 52 C18 26 38 14 60 14 C82 14 102 26 102 52 C102 74 86 90 60 90 C34 90 18 74 18 52 Z" fill="#0b0b0d" />
          <path className={styles.pawL} d="M30 96 C26 80 34 72 44 74 C52 76 54 86 50 96 Z" fill="#0b0b0d" />
          <path className={styles.pawR} d="M90 96 C94 80 86 72 76 74 C68 76 66 86 70 96 Z" fill="#0b0b0d" />
        </g>
        <path d="M18 52 C18 26 38 14 60 14 C82 14 102 26 102 52 C102 74 86 90 60 90 C34 90 18 74 18 52 Z" fill="none" stroke="#48564f" strokeWidth={0.7} />
        <ellipse cx="44" cy="46" rx="9.5" ry="12" fill="#f6f8f6" />
        <ellipse cx="76" cy="46" rx="9.5" ry="12" fill="#f6f8f6" />
        <g className={styles.pupils}>
          <circle cx="45" cy="48" r="6.5" fill="#0b0b0d" />
          <circle cx="75" cy="48" r="6.5" fill="#0b0b0d" />
          <circle cx="42" cy="44" r="2.4" fill="#fff" />
          <circle cx="72" cy="44" r="2.4" fill="#fff" />
        </g>
        <path d="M57 58 h6 l-3 3.2 z" fill="#ff9eb1" />
        <g fill="#ffd9e1" opacity={0.9}>
          <ellipse cx="40" cy="84" rx="2.4" ry="3" />
          <ellipse cx="45" cy="86" rx="2.2" ry="2.8" />
          <ellipse cx="80" cy="84" rx="2.4" ry="3" />
          <ellipse cx="75" cy="86" rx="2.2" ry="2.8" />
        </g>
        <circle cx="60" cy="92" r="6" fill="#f4d97a" stroke="#caa83f" strokeWidth={0.8} />
        <line x1="54" y1="90" x2="66" y2="90" stroke="#caa83f" strokeWidth={0.9} />
        <circle cx="60" cy="94" r="1.3" fill="#caa83f" />
      </svg>
    );
  }

  // lying (idle launcher)
  return (
    <svg
      ref={ref}
      className={styles.lie}
      width={size}
      height={size}
      viewBox="0 0 130 130"
      aria-hidden="true"
    >
      <defs>
        <filter id="glowLie" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="#7fe3c0" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#glowLie)">
        <path
          className={styles.lieTail}
          d="M64 78 C58 56 60 36 74 26 C84 19 96 22 96 32 C96 41 86 40 84 33 C82 27 74 31 73 44 C72 56 74 66 78 76 Z"
          fill="#0b0b0d"
        />
        <path
          d="M34 108 C16 104 16 80 33 73 C44 68 52 64 70 68 C86 71 100 76 103 90 C105 101 100 110 86 112 C64 116 46 115 34 108 Z"
          fill="#0b0b0d"
        />
        <path d="M88 74 l2 -9 l7 6 Z" fill="#0b0b0d" />
        <path d="M99 76 l8 -4 l0 8 Z" fill="#0b0b0d" />
      </g>
      <path
        d="M34 108 C16 104 16 80 33 73 C44 68 52 64 70 68 C86 71 100 76 103 90 C105 101 100 110 86 112 C64 116 46 115 34 108 Z"
        fill="none"
        stroke="#48564f"
        strokeWidth={0.7}
      />
      {/* winking eye */}
      <path d="M76 96 q5 -4 10 0" fill="none" stroke="#f4f7f5" strokeWidth={1.8} strokeLinecap="round" />
      {/* open eye + cursor-following pupil */}
      <circle cx="97" cy="95" r="4.6" fill="none" stroke="#f4f7f5" strokeWidth={1.8} />
      <circle className={styles.pupils} cx="97" cy="95" r="1.8" fill="#f4f7f5" />
      <path d="M89 103 q1.6 1.6 3.2 0" fill="none" stroke="#f4f7f5" strokeWidth={1.4} strokeLinecap="round" />
      <g stroke="#f4f7f5" strokeWidth={1.1} strokeLinecap="round" opacity={0.9}>
        <line x1="104" y1="98" x2="113" y2="96" />
        <line x1="104" y1="101" x2="113" y2="103" />
      </g>
    </svg>
  );
}
