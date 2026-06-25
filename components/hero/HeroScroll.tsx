"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Particles from "@/components/ui/Particles";

/**
 * A headline that fades/blurs in within a scroll window [start, peak, end].
 * When `entry` is true the stage is fully visible at scroll 0 (no fade-in),
 * so the very top of the page is never blank on load.
 */
function Stage({
  progress,
  range,
  children,
  className = "",
  entry = false,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: React.ReactNode;
  className?: string;
  entry?: boolean;
}) {
  const opacity = useTransform(
    progress,
    entry ? [range[0], range[2], range[3]] : range,
    entry ? [1, 1, 0] : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [range[0], range[3]], entry ? [0, -40] : [40, -40]);
  const blur = useTransform(
    progress,
    entry ? [range[0], range[2], range[3]] : range,
    entry ? [0, 0, 12] : [12, 0, 0, 12]
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <m.div
      style={{ opacity, y, filter }}
      className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-transform ${className}`}
    >
      {children}
    </m.div>
  );
}

export default function HeroScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Orb evolves continuously across the whole scroll.
  const orbScale = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [1, 1.6, 2.2, 2.8, 3.4]);
  const orbOpacity = useTransform(p, [0, 0.5, 0.85, 1], [0.9, 0.7, 0.4, 0]);
  const orbHue = useTransform(p, [0, 0.5, 1], [262, 200, 320]);
  const orbBg = useTransform(
    orbHue,
    (h) =>
      `radial-gradient(circle at 50% 50%, hsla(${h}, 90%, 70%, 0.9), hsla(${
        h + 40
      }, 90%, 60%, 0.35) 45%, transparent 70%)`
  );

  // Ambient background gradient shift.
  const bgRotate = useTransform(p, [0, 1], [0, 80]);
  const bgGradient = useTransform(
    bgRotate,
    (r) =>
      `radial-gradient(120% 120% at ${50 + r / 4}% ${
        30 + r / 6
      }%, rgba(124,92,255,0.18), transparent 55%), radial-gradient(100% 100% at ${
        20 + r / 3
      }% 80%, rgba(61,224,224,0.12), transparent 55%)`
  );

  // Parallax depth for layers.
  const gridOpacity = useTransform(p, [0.35, 0.5, 0.62, 0.72], [0, 0.6, 0.6, 0]);
  const gridScale = useTransform(p, [0.35, 0.72], [1.2, 0.85]);

  const shapesOpacity = useTransform(p, [0.6, 0.75, 0.92], [0, 1, 0]);
  const shapesRotate = useTransform(p, [0.6, 1], [0, 120]);

  const streakOpacity = useTransform(p, [0.45, 0.55, 0.7], [0, 0.7, 0]);

  // Final exit: scale/fade the whole sticky stage into the next section.
  const stageScale = useTransform(p, [0.9, 1], [1, 1.08]);
  const stageOpacity = useTransform(p, [0.92, 1], [1, 0]);

  const hintOpacity = useTransform(p, [0, 0.05], [1, 0]);

  return (
    <section ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient evolving background */}
        <m.div
          className="absolute inset-0"
          style={{ background: bgGradient }}
          aria-hidden
        />

        {/* Particle field */}
        <Particles density={50} />

        {/* Animated grid (50%) */}
        <m.div
          aria-hidden
          className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
          style={{ opacity: gridOpacity, scale: gridScale }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              transform: "perspective(600px) rotateX(55deg)",
              transformOrigin: "center",
            }}
          />
        </m.div>

        {/* Light streaks (around 50%) */}
        <m.div
          aria-hidden
          className="absolute inset-0"
          style={{ opacity: streakOpacity }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px"
              style={{
                left: `${15 + i * 18}%`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(124,92,255,0.5), rgba(61,224,224,0.4), transparent)",
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </m.div>

        {/* Geometric shapes (75%) */}
        <m.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: shapesOpacity }}
        >
          <m.div style={{ rotate: shapesRotate }} className="relative">
            <div className="h-[60vmin] w-[60vmin] rounded-[30%] border border-white/10" />
            <div className="absolute inset-[8%] rotate-45 rounded-[28%] border border-accent-violet/30" />
            <div className="absolute inset-[20%] rounded-full border border-accent-cyan/30" />
          </m.div>
        </m.div>

        {/* The glowing orb */}
        <m.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-transform"
          style={{ scale: orbScale, opacity: orbOpacity }}
        >
          <m.div
            className="h-[42vmin] w-[42vmin] rounded-full blur-2xl"
            style={{ background: orbBg }}
          />
          <div className="absolute inset-0 m-auto h-[20vmin] w-[20vmin] rounded-full bg-white/5 blur-xl" />
        </m.div>


        {/* Floating cards (around 50%) */}
        <m.div
          aria-hidden
          className="absolute inset-0"
          style={{ opacity: gridOpacity }}
        >
          {[
            { t: "10%", l: "12%", d: 0 },
            { t: "22%", l: "74%", d: 1.2 },
            { t: "68%", l: "18%", d: 0.6 },
            { t: "72%", l: "78%", d: 1.8 },
          ].map((c, i) => (
            <m.div
              key={i}
              className="absolute h-24 w-40 rounded-2xl glass"
              style={{ top: c.t, left: c.l }}
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.d,
              }}
            >
              <div className="m-3 h-2 w-16 rounded-full bg-white/20" />
              <div className="mx-3 h-2 w-24 rounded-full bg-white/10" />
            </m.div>
          ))}
        </m.div>

        {/* Text stages */}
        <m.div
          className="relative z-10 h-full"
          style={{ scale: stageScale, opacity: stageOpacity }}
        >
          {/* 0% */}
          <Stage progress={p} range={[0, 0.02, 0.16, 0.22]} entry>
            {/* Portrait above the name */}
            <m.div
              className="relative mb-10 h-64 w-64 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <m.span
                aria-hidden
                className="absolute -inset-[3px] rounded-full opacity-80 blur-[6px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--violet), var(--cyan), var(--magenta), var(--violet))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <m.span
                aria-hidden
                className="absolute -inset-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,92,255,0.45), transparent 70%)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <m.div
                className="relative h-full w-full overflow-hidden rounded-full border border-white/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/profile.png"
                  alt="Anju Singh"
                  fill
                  priority
                  sizes="416px"
                  className="object-cover"
                />
              </m.div>
            </m.div>

            <m.p
              className="section-label mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Portfolio — 2026
            </m.p>
            <m.h1
              className="font-display text-[clamp(3rem,12vw,11rem)] font-bold leading-[0.9] tracking-tightest text-gradient"
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              ANJU SINGH
            </m.h1>
            <m.p
              className="mt-6 text-base tracking-[0.35em] text-white/50 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              AI PRODUCT LEADER • BUILDER • RESEARCHER
            </m.p>
          </Stage>

          {/* 25% */}
          <Stage progress={p} range={[0.2, 0.27, 0.4, 0.46]}>
            <h2 className="max-w-4xl font-display text-[clamp(1.8rem,5vw,4rem)] font-medium leading-tight text-white">
              I build{" "}
              <span className="text-gradient">AI-powered products</span> that
              solve real customer problems.
            </h2>
          </Stage>

          {/* 50% */}
          <Stage progress={p} range={[0.44, 0.52, 0.62, 0.68]}>
            <h2 className="max-w-4xl font-display text-[clamp(1.8rem,5vw,4rem)] font-medium leading-tight text-white">
              Bridging{" "}
              <span className="text-gradient">Product Strategy, AI,</span> and
              Engineering.
            </h2>
          </Stage>

          {/* 75% */}
          <Stage progress={p} range={[0.66, 0.74, 0.86, 0.92]}>
            <h2 className="max-w-4xl font-display text-[clamp(1.8rem,5vw,4rem)] font-medium leading-tight text-white">
              Transforming Ideas Into{" "}
              <span className="text-gradient">Scalable Experiences.</span>
            </h2>
          </Stage>
        </m.div>

        {/* Scroll hint */}
        <m.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
        >
          <div className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <m.div
              className="h-2 w-1 rounded-full bg-white/60"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll
          </p>
        </m.div>
      </div>
    </section>
  );
}
