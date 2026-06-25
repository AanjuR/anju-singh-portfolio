"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[75] flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-2xl" : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          data-cursor="hover"
          className="px-4 py-1.5 font-display text-sm font-semibold tracking-tight text-white"
        >
          AS<span className="text-accent-violet">.</span>
        </a>
        <AnimatePresence>
          {scrolled && (
            <m.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden items-center gap-1 overflow-hidden sm:flex"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  data-cursor="hover"
                  className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </m.div>
          )}
        </AnimatePresence>
        <a
          href="#contact"
          data-cursor="hover"
          className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          Let&apos;s talk
        </a>
      </nav>
    </m.header>
  );
}
