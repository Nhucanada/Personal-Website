# AGENTS.md

Primary agent context for Nathan Hu's personal website. Read this first, then load the
relevant page in `.agents/context/` for the area you're working in.

## What this project is

A single-page personal portfolio website built with **React 18 + TypeScript 5 + Vite + Three.js**
and tested with **Vitest + React Testing Library**. The repository lives at the root (the legacy
`api/` Spring Boot module, Maven wrappers, CRA toolchain, and unused Material UI dependencies
were removed).

## Live site shape (important — read before assuming)

The live experience is a dual-identity site with a split-screen landing selector that branches
into two sections:

- `/` → `SiteSelectorPage` (or `UnderConstructionPage` when the construction flag is on).
  The selector shows both homepages as a seamless split screen — no divider line. The inactive
  side dims to black and shows a section-name label centred in that strip. Split is inverted
  (mouse left → more photography; mouse right → more software) and capped so neither side is
  less than 1/3 of the viewport. The selector navs use the real `.photo-nav` / `.sw-nav`
  classes to stay in sync with the section pages. Clicking either side navigates to that section.
- `/photo/*` → the **photography portfolio**. Index (`/photo`) is `PhotographyHomePage` —
  warm `#f6f4ef` background with centered viewer-tier `selector-background.jpg`. Portfolio grid
  is at `/photo/work`. Fully built-out section backed by static data in `src/data/photography.ts`.
- `/dev/*` → the **software portfolio** — dark-mode, modern-geometric section. Index (`/dev`)
  is `SoftwareHomePage` which shows an interactive Three.js isometric room scene (matching the
  selector's right side, lazy-loaded via `React.lazy`) on the first screen and the bio/CTA hero
  on scroll. Five pages: Home, About, Projects, Work (Experience), Contact. Static data in
  `src/data/software.ts`.

## Commands

Run from the repo root:

- Dev server: `npm run dev` (or `npm start`, port 3000)
- Production build: `npm run build` (runs `tsc --noEmit && vite build`, outputs to `dist/`)
- Preview production build: `npm run preview`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint` (strict zero-warning check: `npm run lint:check`)
- Unit & component tests: `npm test` (watch mode: `npm run test:watch`)
- Regenerate optimized photos: `npm run photos:optimize`

## Environment config

- Feature flags (`src/utils/featureFlags.ts`), active only in production builds (`import.meta.env.PROD`) so local `npm run dev` always has full access to all sections (also supports legacy `REACT_APP_` prefix via `envPrefix: ['VITE_', 'REACT_APP_']` in `vite.config.ts`):
  - `VITE_SITE_UNDER_CONSTRUCTION=true` — gates the entire site behind `UnderConstructionPage` at `/` and redirects `/dev/*` and `/photo/*` to `/`.
  - `VITE_SWE_UNDER_CONSTRUCTION=true` — disables the `/dev` software section in prod and redirects `/` and `/dev/*` directly to `/photo` (currently enabled in `.env.production`).
  - `VITE_PHOTO_UNDER_CONSTRUCTION=true` — disables the `/photo` photography section in prod and redirects `/` and `/photo/*` directly to `/dev`.
  - See `.env.example` and `.env.production`.

## Conventions

- TypeScript 5 (`strict: true`) everywhere in `src/`; keep ESLint clean (`lint:check` allows zero warnings).
- Zero UI library bloat: icons live in `src/components/Icons.tsx` as lightweight inline SVGs, and
  global reset rules live in `src/styles/base.css`.
- Photography display images go through the optimizer (`scripts/optimize-photos.cjs`); grid pages
  use `getOptimizedPhotoSrc` (max width 900px), the full-screen viewer, `SiteSelectorPage`, and
  `PhotographyHomePage` use `getViewerPhotoSrc` (max height 1500px), while `UnderConstructionPage`
  uses `/photos/selector-background.jpg`. See `.agents/context/image-pipeline.md`.
- Photo collections are static data in `src/data/photography.ts`. When photo files change,
  rerun `npm run photos:optimize` and resync that data file. Use the `optimize-photos` skill.
- Netlify deployment config lives in `netlify.toml` (`publish = "dist"`) and `public/_redirects`
  (`/* /index.html 200`).

## Context pages

Load the page for the area you're touching:

- `.agents/context/architecture.md` — tech stack, build, test, and deploy topology.
- `.agents/context/frontend.md` — routing, page inventory, photography IA, styling/theme.
- `.agents/context/image-pipeline.md` — photo optimizer script and runtime source mapping.

## Skills

- `.agents/skills/optimize-photos/SKILL.md` — add/replace photos and keep data + optimized
  assets in sync.
- `.agents/skills/sync-context/SKILL.md` — keep AGENTS.md and context pages trustworthy after
  routing, data, or pipeline changes.

## Git workflow

- **Push all changes to the `staging` branch only.** Do not push directly to `main` — `main` is
  promoted from `staging` separately. When committing work, push with `git push origin HEAD:staging`
  (or work on `staging` and push to `staging`).
- Never force-push `staging` or `main` unless explicitly asked.

## Maintenance rule — keep this context alive

This file, `.agents/context/`, and `.agents/skills/` are the source of truth for agents. They
are not write-once docs: **treat maintaining them as part of every task, not an afterthought.**

Every task that changes the project must leave the context at least as accurate as it found it:

- **Update in the same change, never "later."** If you change routing, styling, the image
  pipeline, the data model, build, or env config, update the affected `.agents/context/` page
  and this file's summaries in the same commit. Follow the `sync-context` skill.
- **Grow the docs as you learn.** When you discover a non-obvious constraint, gotcha, decision,
  or recurring workflow, write it down in the relevant context page (or `AGENTS.md` if it's
  high-level).
- **Capture repeatable procedures as skills.** If a task involves a multi-step procedure you
  would repeat, add or update a skill under `.agents/skills/<name>/SKILL.md`.
- **Prune what's no longer true.** When you delete or replace code, remove the corresponding
  claims here immediately.
- **Verify before you write.** Only record facts you've confirmed against the code (exact paths,
  route strings, script constants).
- **Keep `AGENTS.md` lean.** Push detail into context pages and skills; keep this file a concise
  map that points to them.
