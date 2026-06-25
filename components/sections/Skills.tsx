"use client";

import { motion } from "framer-motion";
import { skillCategories, type SkillCategory } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

function RadialMeter({ level, accent }: { level: number; accent: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
        {level}
      </span>
    </div>
  );
}

function SkillCard({ cat, index }: { cat: SkillCategory; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.div
        data-cursor="hover"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="gradient-border group relative h-full overflow-hidden rounded-3xl glass p-6"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: cat.accent }}
        />
        <div className="relative flex items-center gap-4">
          <RadialMeter level={cat.level} accent={cat.accent} />
          <h3 className="font-display text-lg font-semibold leading-tight text-white">
            {cat.title}
          </h3>
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {cat.skills.map((s) => (
            <motion.span
              key={s}
              whileHover={{ scale: 1.06 }}
              className="rounded-full border px-3 py-1 text-xs text-white/70"
              style={{
                borderColor: `${cat.accent}40`,
                background: `${cat.accent}12`,
              }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36"
    >
      <SectionHeading
        label="Capabilities"
        title="A multidisciplinary toolkit for building AI products."
        description="Where product intuition meets technical depth — spanning strategy, AI systems, growth, security, and data."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.title} cat={cat} index={i} />
        ))}
      </div>
    </section>
  );
}
