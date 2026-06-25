"use client";

import { useRef, type ReactNode } from "react";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import DeferredParticles from "@/components/ui/DeferredParticles";

function Stage({
  progress,
  range,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: ReactNode;
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[3]], [40, -40]);
  const blur = useTransform(progress, range, [12, 0, 0, 12]);
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

type Props = {
  /** Server-rendered hero entry — visible immediately for LCP, faded on scroll. */
  children: ReactNode;
};

export default function HeroScrollEffects({ children }: Props) {
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

  const gridOpacity = useTransform(p, [0.35, 0.5, 0.62, 0.72], [0, 0.6, 0.6, 0]);
  const gridScale = useTransform(p, [0.35, 0.72], [1.2, 0.85]);
  const shapesOpacity = useTransform(p, [0.6, 0.75, 0.92], [0, 1, 0]);
  const shapesRotate = useTransform(p, [0.6, 1], [0, 120]);
  const streakOpacity = useTransform(p, [0.45, 0.55, 0.7], [0, 0.7, 0]);
  const stageScale = useTransform(p, [0.9, 1], [1, 1.08]);
  const stageOpacity = useTransform(p, [0.92, 1], [1, 0]);
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0]);

  // Fade the server-rendered entry out as scroll narrative begins.
  const entryOpacity = useTransform(p, [0, 0.13, 0.19], [1, 1, 0]);
  const entryY = useTransform(p, [0, 0.19], [0, -30]);
  const entryBlur = useTransform(p, [0.1, 0.19], [0, 10]);
  const entryFilter = useTransform(entryBlur, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <m.div
          className="absolute inset-0"
          style={{ background: bgGradient }}
          aria-hidden
        />

        <DeferredParticles density={50} />

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

        <m.div
          className="relative z-10 h-full"
          style={{ scale: stageScale, opacity: stageOpacity }}
        >
          {/* Server-rendered entry — LCP paints before hydration */}
          <m.div
            className="absolute inset-0 flex flex-col items-center justify-center will-transform"
            style={{ opacity: entryOpacity, y: entryY, filter: entryFilter }}
          >
            {children}
          </m.div>

          <Stage progress={p} range={[0.2, 0.27, 0.4, 0.46]}>
            <h2 className="max-w-4xl font-display text-[clamp(1.8rem,5vw,4rem)] font-medium leading-tight text-white">
              I build{" "}
              <span className="text-gradient">AI-powered products</span> that
              solve real customer problems.
            </h2>
          </Stage>

          <Stage progress={p} range={[0.44, 0.52, 0.62, 0.68]}>
            <h2 className="max-w-4xl font-display text-[clamp(1.8rem,5vw,4rem)] font-medium leading-tight text-white">
              Bridging{" "}
              <span className="text-gradient">Product Strategy, AI,</span> and
              Engineering.
            </h2>
          </Stage>

          <Stage progress={p} range={[0.66, 0.74, 0.86, 0.92]}>
            <h2 className="max-w-4xl font-display text-[clamp(1.8rem,5vw,4rem)] font-medium leading-tight text-white">
              Transforming Ideas Into{" "}
              <span className="text-gradient">Scalable Experiences.</span>
            </h2>
          </Stage>
        </m.div>

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
