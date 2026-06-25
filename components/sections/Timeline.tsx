"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

function TimelineRow({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex md:min-h-[220px]">
      {/* Content side */}
      <m.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full pl-16 md:w-1/2 md:pl-0 ${
          isLeft
            ? "md:pr-16 md:text-right"
            : "md:ml-auto md:pl-16 md:text-left"
        }`}
      >
        <span
          className="text-xs font-medium uppercase tracking-[0.3em]"
          style={{ color: item.accent }}
        >
          {item.year}
        </span>
        <div className="mt-3 inline-block w-full rounded-2xl glass p-6">
          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/60">{item.org}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            {item.description}
          </p>
        </div>
      </m.div>

      {/* Node on the line */}
      <div className="absolute left-6 top-2 -translate-x-1/2 md:left-1/2">
        <m.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
          className="relative flex h-4 w-4 items-center justify-center rounded-full"
          style={{
            background: item.accent,
            boxShadow: `0 0 18px ${item.accent}`,
          }}
        >
          <span className="absolute h-8 w-8 animate-ping rounded-full opacity-20" style={{ background: item.accent }} />
        </m.span>
      </div>
    </div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <SectionHeading
        label="Trajectory"
        title="A path from research rigor to shipped AI products."
        align="center"
      />

      <div ref={ref} className="relative mt-20">
        {/* Static rail */}
        <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2" />
        {/* Animated progress rail */}
        <m.div
          className="absolute left-6 top-0 h-full w-px origin-top md:left-1/2"
          style={{
            scaleY: lineScale,
            background:
              "linear-gradient(to bottom, var(--violet), var(--cyan), var(--magenta))",
          }}
        />

        <div className="flex flex-col gap-12 md:gap-4">
          {timeline.map((item, i) => (
            <TimelineRow key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
