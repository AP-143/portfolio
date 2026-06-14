# Akbar Jaya Pratama Putra — Portfolio (Scroll-Driven 3D)

A one-page portfolio with a **scroll-driven 3D scene** (Vectr-style): a pinned WebGL
stage where scroll scrubs the camera through a procedural "systems / risk /
probability" network while four identity beats fade in and out. Built for the Apple
Developer Academy 2026 application.

## Stack & why

- **Vite + React + TypeScript** — it's a client-only WebGL one-pager, so SSR adds no
  value; Vite gives an instant dev loop and a static `dist/` that drops straight onto
  GitHub Pages.
- **three.js + @react-three/fiber + @react-three/drei** — declarative 3D.
- **Lenis** — smooth scroll (single `requestAnimationFrame` loop + lerp).
- **GSAP** — available for timeline tweaks (the pin + progress are done with native
  `position: sticky` + a rAF/lerp progress mapper for robustness).
- **Tailwind CSS** — styling.

## Scroll mechanic

`ScrollStage` renders a very tall section (`height: 440vh`) whose inner viewport is
`position: sticky; height: 100vh`. A rAF loop maps the section's scroll position to a
smoothed **progress 0 → 1** (`current += (target - current) * 0.1`). That single value:

- drives the R3F camera along 4 waypoints (read per-frame via a ref in `useFrame` — no
  React state in the hot path), and
- switches the active **step text (01–04)** by segment.

After progress reaches 1 the sticky releases and the page scrolls on normally.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  content.ts              <- all copy (name, 4 beats, 5 projects, skills, closing, contact)
  App.tsx
  lib/
    SmoothScroll.tsx       Lenis provider (rAF loop; disabled for reduced-motion)
    useReducedMotion.ts
    useReveals.ts          IntersectionObserver reveal-on-scroll
  components/
    Hero.tsx
    ScrollStage.tsx        pinned section + progress 0->1
    Scene.tsx              procedural 3D (network, light paths, core, particles, equity curve)
    Steps.tsx              4 beats synced to progress
    Projects.tsx           data-driven from content.ts
    Skills.tsx / Closing.tsx / Footer.tsx
```

## Accessibility & performance

- Respects `prefers-reduced-motion` (no Lenis, static scene, content stays readable).
- `devicePixelRatio` clamped to <=2, `<Suspense>` boundary, no per-frame allocations,
  instanced meshes for the city modules.
- Content is real semantic HTML and readable without the 3D layer; `<noscript>` fallback.

## TODO — assets to add

Drop image files in **`public/assets/`** and set their `src` in `src/content.ts`
(currently `null` -> renders a labelled placeholder):

- **ClipStudio** — landing, live pipeline, results, editor (4)
- **Zulffaya** — landing, catalogue, Midtrans, admin (4)
- **Trading Backtest** — equity curve, dashboard, monthly breakdown (3)
- **Fruittables** — homepage hero (1)

Example: save `public/assets/clipstudio-landing.png`, then in `content.ts` set
`src: "/assets/clipstudio-landing.png"`.
