---
name: sync-context
description: Keep AGENTS.md and .agents/context/ accurate after changes to routing, the image pipeline, the photography/software data models, or build/module structure. Use at the end of any change that alters project shape.
---

# Sync agent context

This skill prevents documentation drift by updating the agent context whenever project shape changes.

## When to run

Trigger this whenever a change touches any of:

- Routing or the page inventory (`src/App.tsx`, added/removed/relocated pages).
- Global styling or component structure.
- The image pipeline (`scripts/optimize-photos.cjs`, `src/utils/photoOptimization.ts`).
- The photography or software data models (`src/data/photography.ts`, `src/data/software.ts`).
- Build, test, or environment configuration (`package.json`, `vite.config.ts`, `netlify.toml`).
- **Learning something worth persisting** — a non-obvious constraint, gotcha, or decision (record
  it in the relevant context page), or a repeatable multi-step procedure (capture it as a skill
  under `.agents/skills/<name>/SKILL.md` and link it from AGENTS.md's "Skills" list).

## Steps

1. Identify which context page(s) the change affects:
   - `.agents/context/frontend.md` — routing, pages, styling, photography IA, data sources, tests.
   - `.agents/context/image-pipeline.md` — optimizer + runtime mapping.
   - `.agents/context/architecture.md` — stack, build, deploy, directory map, sizes.
   - `AGENTS.md` — commands, live site summary, conventions, env config, pointers.

2. Update the affected page(s) to match reality. Prefer precise, verifiable statements
   (exact route paths, filenames, script constants) over vague description.

3. Verify claims against the code before writing them — open the file and confirm. Do not copy
   forward numbers or names you did not check.

## Guardrails

- Keep `AGENTS.md` concise; push detail into context pages.
- Never reintroduce stale claims (e.g., Spring Boot `api/`, Maven, CRA, Material UI, WebP).
- Update context in the same change that caused the drift, not "later".
