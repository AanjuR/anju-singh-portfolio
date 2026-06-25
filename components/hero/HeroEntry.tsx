import Image from "next/image";

/**
 * Server-rendered hero entry — paints immediately for LCP without waiting
 * for client JS. Scroll fade is applied by HeroScrollEffects (client wrapper).
 */
export default function HeroEntry() {
  return (
    <div className="flex flex-col items-center justify-center px-6 text-center">
      <div className="hero-portrait mb-10 h-64 w-64 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]">
        <span aria-hidden className="hero-portrait-ring" />
        <span aria-hidden className="hero-portrait-glow" />
        <div className="hero-portrait-frame relative h-full w-full overflow-hidden rounded-full border border-white/20">
          <Image
            src="/profile.png"
            alt="Anju Singh"
            fill
            priority
            sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 416px"
            className="object-cover"
          />
        </div>
      </div>

      <p className="hero-entry-label section-label mb-6">Portfolio — 2026</p>
      <h1 className="hero-entry-title font-display text-[clamp(3rem,12vw,11rem)] font-bold leading-[0.9] tracking-tightest text-gradient">
        ANJU SINGH
      </h1>
      <p className="hero-entry-sub mt-6 text-base tracking-[0.35em] text-white/50 sm:text-lg">
        AI PRODUCT LEADER • BUILDER • RESEARCHER
      </p>
    </div>
  );
}
