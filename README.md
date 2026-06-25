# Anju Singh — Portfolio

A premium, dark-themed personal portfolio for an AI Product Leader, featuring cinematic scroll-driven storytelling, glassmorphism UI, and award-worthy motion design.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Hero scrollytelling** — a `500vh` scroll container with a sticky viewport and a `useScroll`-driven timeline (glowing orb, particle field, animated grid, light streaks, morphing geometry, scroll-triggered typography).
- **Featured projects** — a 3D-tilt bento grid with gradient borders, cursor-tracking glow, and animated iconography.
- **Experience timeline** — scroll-revealed milestones with an animated connecting rail.
- **Skills** — interactive cards with animated radial meters and skill chips.
- **Contact** — a glowing CTA with magnetic buttons (email, LinkedIn, resume).
- **Microinteractions** — custom cursor glow, magnetic buttons, scroll progress bar, blur-to-focus reveals, noise grain, and a morphing floating nav.
- **Performance & a11y** — GPU-accelerated transforms, lazy-loaded sections, capped DPR canvas particles, IntersectionObserver pausing, and full `prefers-reduced-motion` support.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm run start   # production build
```

## Customization

- **Content** lives in `lib/data.ts` (projects, timeline, skills, social links).
- **Design tokens** (colors, glass, gradients) live in `app/globals.css` and `tailwind.config.ts`.
- Drop a `resume.pdf` into `public/` to wire up the resume download button, and update `socials` in `lib/data.ts`.

## Project structure

```
app/                 # App Router entry (layout, page, globals)
components/
  hero/              # HeroScroll scrollytelling
  sections/          # Projects, Timeline, Skills, Contact
  ui/                # Reusable UI + microinteractions
lib/                 # Content + types
public/              # Static assets
```
