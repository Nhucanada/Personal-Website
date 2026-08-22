# CLAUDE.md

Primary agent context for Nathan Hu's personal website. Read this first, then load the
relevant page in `.claude/context/` for the area you're working in.

## What this project is

A full-stack personal website with two independent deliverables:

- `ui/` — React 18 + TypeScript + Material UI 5 (Create React App). This is the live site.
- `api/` — Spring Boot 2.7 (Java 11) REST API that serves profile/photography JSON data.

The two modules are wired together only through a root Maven multi-module build; at runtime
they are deployed separately (see environment config below). The site is not currently
deployed publicly — run it locally.

## Live site shape (important — read before assuming)

The live experience is a **light-themed** site with a landing selector that branches into two
sections:

- `/` → `SiteSelectorPage` (or `UnderConstructionPage` when the construction flag is on).
- `/photo/*` → the **photography portfolio** (the fully built-out section).
- `/dev/*` → `SoftwarePlaceholderPage` (a work-in-progress stub that embeds a resume PDF).

The old software dashboard pages (`HomePage`, `AboutPage`, `ProjectsPage`,
`WorkExperiencePage`, `EducationPage`, `ContactPage`, `AIPage`), their `Header`/`WelcomeCard`
components, the `useProfileData` hooks, the `utils/api` client, and all their tests were
**removed** — the live UI no longer depends on the backend at runtime. If you need a software
section, build it fresh under `/dev`.

## Commands

Run from the repo root unless noted. `PREFIX` below is `/Users/nathanhu/Dev/Personal-Website/ui`.

- Frontend dev server: `npm --prefix ui start`
- Frontend build: `npm --prefix ui run build`
- Frontend lint: `npm --prefix ui run lint` (strict: `npm --prefix ui run lint:check`)
- Frontend tests: `cd ui && npm test`
- Regenerate optimized photos: `npm --prefix ui run photos:optimize`
- Backend run: `mvn spring-boot:run -pl api`
- Backend tests: `mvn test -pl api`
- Full multi-module build: `mvn clean install`

## Environment config

Separate frontend/backend deployments are driven by env vars:

- Frontend API base URL: `REACT_APP_API_URL` (see `ui/.env.example`).
- Construction gate: `REACT_APP_SITE_UNDER_CONSTRUCTION=true` **and** `NODE_ENV=production`.
- Backend CORS origins: `APP_CORS_ALLOWED_ORIGINS` (see `api/.env.example`).
- Backend port: `SERVER_PORT` (default 8080).

## Conventions

- TypeScript everywhere in `ui/src`; keep ESLint clean (`lint:check` allows zero warnings).
- Photography display images go through the optimizer; the full-screen viewer and the home
  selector background intentionally use originals. See `.claude/context/image-pipeline.md`.
- Photo collections are static data in `ui/src/data/photography.ts`. When photo files change,
  rerun `photos:optimize` and resync that data file. Use the `optimize-photos` skill.
- Netlify SPA fallback lives in `ui/public/_redirects` (`/* /index.html 200`).

## Context pages

Load the page for the area you're touching:

- `.claude/context/architecture.md` — modules, tech stack, build, deploy topology.
- `.claude/context/frontend.md` — routing, page inventory, photography IA, styling/theme.
- `.claude/context/backend.md` — Spring Boot API endpoints, data files, models, tests.
- `.claude/context/image-pipeline.md` — photo optimizer script and runtime source mapping.

## Skills

- `.claude/skills/optimize-photos/SKILL.md` — add/replace photos and keep data + optimized
  assets in sync.
- `.claude/skills/sync-context/SKILL.md` — keep CLAUDE.md and context pages trustworthy after
  routing, data, or pipeline changes.

## Maintenance rule

This file and `.claude/context/` are the source of truth for agents. Whenever routing, the
image pipeline, the photography data model, or module structure changes, update the affected
context page in the same change. Stale context is worse than none — the previous handoff docs
drifted badly from reality and were removed for this reason.
