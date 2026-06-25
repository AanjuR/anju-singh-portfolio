"use client";

import { m, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--violet), var(--cyan), var(--magenta))",
      }}
    />
  );
}
