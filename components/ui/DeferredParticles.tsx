"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("@/components/ui/Particles"), { ssr: false });

type Props = {
  density?: number;
  className?: string;
};

/** Delloads the canvas particle field until the browser is idle — keeps first paint fast. */
export default function DeferredParticles({ density = 50, className = "" }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return <Particles density={density} className={className} />;
}
