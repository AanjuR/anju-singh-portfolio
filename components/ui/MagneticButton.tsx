"use client";

import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  download?: boolean;
  target?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.4,
  download,
  target,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  );

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={`group relative inline-flex items-center justify-center will-transform ${className}`}
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          download={download}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="contents"
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className="contents">
          {inner}
        </button>
      )}
    </m.div>
  );
}
