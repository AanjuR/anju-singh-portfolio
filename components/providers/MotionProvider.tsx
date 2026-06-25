"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the `domAnimation` feature bundle (animations, variants, exit,
 * hover/tap/focus, and whileInView) so every `m.*` component renders with the
 * same behaviour as `motion.*` while shipping far less JavaScript.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
