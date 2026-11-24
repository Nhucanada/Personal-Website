# Nathan Hu — Personal Website

A dual-identity personal portfolio website showcasing both my **software engineering** work and my **film & digital photography**. Built with React 18, TypeScript 5, Vite, and Three.js.

## Features

- **Interactive Split-Screen Selector (`/`)** — Cursor-driven 60fps `requestAnimationFrame` split screen with `clip-path` compositing, lerp damping, dynamic section dimming, state-seeded return transitions, and touch-device fallback.
- **Photography Portfolio (`/photo/*`)** — Editorial serif layout featuring a 3-column masonry portfolio grid, hierarchical category hubs (`Collections`, `Commissioned`, `Polaroids`, `People` → Location/Studio, `Series` → Street/Motorsport/Landscape), and a scroll-locked full-screen image viewer.
- **Two-Tier Image Optimization Pipeline** — Build-time `sharp` + `mozjpeg` pipeline (`scripts/optimize-photos.cjs`) with automatic HEIC→JPEG conversion (`sips`), EXIF orientation normalization, sRGB ICC profile embedding, and 900w grid / 1500h viewer tiers (~95–98% payload reduction from raw scans).
- **Software Portfolio (`/dev/*`)** — Dark geometric portfolio with a lazy-loaded interactive Three.js isometric room (`SoftwareThreeScene.tsx`), filterable project showcase, internship timeline, skills matrix, and contact page.

## Tech Stack

- **Frontend:** React 18, TypeScript 5 (`strict`), React Router 6, Three.js, custom CSS
- **Build & Tooling:** Vite 6, ESLint 9 (`typescript-eslint`, `jsx-a11y`, `react-hooks`), `sharp`
- **Testing & CI:** Vitest, React Testing Library, jsdom, GitHub Actions CI

## Project Structure

```
personal-website/
├── index.html                  # Vite HTML entry
├── src/
│   ├── App.tsx                 # Top-level and nested routing
│   ├── components/             # PhotographyNav, SoftwareNav, SoftwareThreeScene, Icons
│   ├── data/                   # Static photography and software portfolio data
│   ├── pages/                  # SiteSelectorPage, photography/*, software/*
│   ├── styles/                 # base.css, photography.css, selector.css, software.css
│   └── utils/                  # photoOptimization.ts runtime path mapper
├── public/
│   ├── _redirects              # Netlify SPA fallback
│   ├── documents/              # Resume PDF
│   └── photos/                 # Source photos and generated optimized/ tiers
├── scripts/
│   └── optimize-photos.cjs     # Two-tier sharp + mozjpeg image optimizer
├── .agents/                    # Living agent context pages and workflow skills
└── AGENTS.md                   # Entry point for AI coding agents
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Run typecheck, strict lint, tests, and production build
npm run typecheck
npm run lint:check
npm test
npm run build
```

### Regenerating Optimized Photos

Whenever source photos are added or updated under `public/photos/`:

```bash
npm run photos:optimize
```

## Agentic Development Loop

This repository maintains a self-updating knowledge base under [`AGENTS.md`](./AGENTS.md), `.agents/context/`, and `.agents/skills/` so AI coding agents load accurate architectural context on demand and update it in the same commit whenever routes, data models, or build tooling change.

## Contact

- **Email:** nhucanada0628@gmail.com
- **McGill Email:** nathan.hu@mail.mcgill.ca
- **LinkedIn:** [linkedin.com/in/nhucanada](https://www.linkedin.com/in/nhucanada/)
- **GitHub:** [github.com/Nhucanada](https://github.com/Nhucanada)

## License

MIT
