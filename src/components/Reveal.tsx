"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fades content up once it scrolls into view. Used below the fold only. The first render is the same
 * on the server and in the browser (reading the motion preference there caused a hydration
 * mismatch); MotionConfig then drops the movement for visitors who prefer reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const Tag = m[as];
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Tag
          className={className}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {children}
        </Tag>
      </MotionConfig>
    </LazyMotion>
  );
}
