"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import styles from "./SpotlightCard.module.scss";

// A card that lifts off the page with a soft shadow, and whose emerald glow
// follows the cursor on hover. `featured` adds an always-on emerald gradient.
// Pure CSS + a tiny mousemove handler — no animation library.
export function SpotlightCard({
  children,
  featured = false,
}: {
  children: ReactNode;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={featured ? `${styles.card} ${styles.featured}` : styles.card}
    >
      {children}
    </div>
  );
}
