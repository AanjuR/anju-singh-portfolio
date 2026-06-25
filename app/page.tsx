import dynamic from "next/dynamic";
import HeroScroll from "@/components/hero/HeroScroll";
import Navbar from "@/components/ui/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import Grain from "@/components/ui/Grain";

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
      <div className="relative z-10 -mt-px bg-gradient-to-b from-transparent to-ink">
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
