"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(
          target.closest("a, button, [data-cursor='hover']")
        )
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Big soft glow following the cursor */}
      <m.div
        aria-hidden
        className="pointer-events-none fixed z-[70] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="h-[480px] w-[480px] rounded-full opacity-[0.12] blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.9), rgba(61,224,224,0.3), transparent 70%)",
          }}
        />
      </m.div>

      {/* Precise dot + ring */}
      <m.div
        aria-hidden
        className="pointer-events-none fixed z-[71] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </m.div>
      <m.div
        aria-hidden
        className="pointer-events-none fixed z-[71] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="h-9 w-9 rounded-full border border-white/40" />
      </m.div>
    </>
  );
}
