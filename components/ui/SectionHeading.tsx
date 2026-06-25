"use client";

import Reveal from "./Reveal";

type Props = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: Props) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <Reveal>
        <span className="section-label">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-violet shadow-[0_0_12px_var(--violet)]" />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-gradient-muted">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-white/50 sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
