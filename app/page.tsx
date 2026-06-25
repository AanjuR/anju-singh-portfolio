import dynamic from "next/dynamic";
import HeroScroll from "@/components/hero";
import Navbar from "@/components/ui/Navbar";
import Grain from "@/components/ui/Grain";

const CursorGlow = dynamic(() => import("@/components/ui/CursorGlow"), {
  ssr: false,
});
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), {
  ssr: false,
});

// Lazy-load below-the-fold sections to keep the initial bundle lean.
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Timeline = dynamic(() => import("@/components/sections/Timeline"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <main id="top" className="relative">
      <Grain />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <HeroScroll />

      {/* Seam from hero into the showcase */}
      <div className="relative z-10 -mt-px bg-gradient-to-b from-transparent to-ink section-stack">
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
