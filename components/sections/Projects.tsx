"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

function ProjectIcon({ accent }: { accent: string }) {
  return (
    <div
      className="relative flex h-12 w-12 items-center justify-center rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${accent}33, transparent)`,
        border: `1px solid ${accent}55`,
      }}
    >
      <motion.span
        className="absolute h-2.5 w-2.5 rounded-full"
        style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="h-7 w-7 rounded-lg border"
        style={{ borderColor: `${accent}66` }}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(srx, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(sry, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set(py - 0.5);
    ry.set(px - 0.5);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(420px circle at ${gx}% ${gy}%, ${project.accent}22, transparent 60%)`
  );

  const spanClass =
    project.span === "lg"
      ? "md:col-span-3"
      : project.span === "md"
        ? "md:col-span-2"
        : "md:col-span-2";

  return (
    <Reveal className={spanClass}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        data-cursor="hover"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="gradient-border group relative h-full min-h-[260px] overflow-hidden rounded-3xl glass p-7 will-transform"
      >
        {/* cursor-tracking glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />
        {/* corner ambient accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: project.accent }}
        />

        <div
          className="relative flex h-full flex-col"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-start justify-between">
            <ProjectIcon accent={project.accent} />
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">
              {project.category}
            </span>
          </div>

          <h3 className="mt-7 font-display text-2xl font-semibold text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <SectionHeading
        label="Featured Work"
        title="Products shipped at the intersection of AI and craft."
        description="A selection of AI-native products — from autonomous agents to generative tools — built end-to-end with measurable customer impact."
      />

      <div className="perspective mt-16 grid grid-cols-1 gap-5 md:grid-cols-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
