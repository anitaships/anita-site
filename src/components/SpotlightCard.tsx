"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import styles from "./SpotlightCard.module.scss";

// A card whose coral glow follows the cursor, with a subtle lift on hover.
// Pure CSS + a tiny mousemove handler — no animation library.
export function SpotlightCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={styles.card}>
      {children}
    </div>
  );
}
