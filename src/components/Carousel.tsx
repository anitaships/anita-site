"use client";

import { ReactNode, useRef } from "react";
import { Column, Row, IconButton } from "@once-ui-system/core";
import styles from "./Carousel.module.scss";

// Horizontal, scroll-snapping card row with prev/next arrows.
// Pure CSS scroll + a tiny scrollBy handler — no carousel library.
export function Carousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 380), behavior: "smooth" });
  };

  return (
    <Column fillWidth gap="16">
      <div ref={ref} className={styles.track}>
        {children}
      </div>
      <Row gap="8" horizontal="end">
        <IconButton icon="arrowLeft" variant="secondary" size="l" onClick={() => scroll(-1)} />
        <IconButton icon="arrowRight" variant="secondary" size="l" onClick={() => scroll(1)} />
      </Row>
    </Column>
  );
}
