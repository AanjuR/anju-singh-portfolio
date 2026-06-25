"use client";

import Image from "next/image";
import { socials } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import DeferredParticles from "@/components/ui/DeferredParticles";

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 sm:py-44"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.6), rgba(61,224,224,0.2), transparent 70%)",
        }}
      />
      <DeferredParticles density={28} />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="mx-auto mb-8 w-fit">
            <div className="relative h-24 w-24">
              <span
                aria-hidden
                className="absolute -inset-1 rounded-full opacity-70 blur-md"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--violet), var(--cyan), var(--magenta), var(--violet))",
                }}
              />
              <Image
                src="/profile.png"
                alt="Anju Singh"
                width={96}
                height={96}
                loading="lazy"
                sizes="96px"
                className="relative h-24 w-24 rounded-full border border-white/20 object-cover"
              />
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-ink bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <span className="section-label justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_12px_var(--cyan)]" />
            Let&apos;s build
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-tightest text-gradient">
            Let&apos;s create
            <br /> what&apos;s next.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Have an ambitious AI product in mind, or just want to trade ideas?
            I&apos;m always open to a good conversation.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${socials.email}`}
              className="rounded-full"
            >
              <span className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90">
                Get in touch
                <ArrowIcon />
              </span>
            </MagneticButton>

            <MagneticButton
              href={socials.linkedin}
              target="_blank"
              className="rounded-full"
            >
              <span className="group inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                LinkedIn
                <ArrowIcon />
              </span>
            </MagneticButton>

            <MagneticButton
              href={socials.resume}
              download
              className="rounded-full"
            >
              <span className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white">
                Resume
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path
                    d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mt-16 text-sm text-white/30">
            {socials.email}
          </p>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row">
        <span>© {new Date().getFullYear()} Anju Singh. All rights reserved.</span>
        <span>Designed &amp; built with Next.js, Framer Motion &amp; care.</span>
      </footer>
    </section>
  );
}
