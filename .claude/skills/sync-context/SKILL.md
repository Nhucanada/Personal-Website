---
name: sync-context
description: Keep CLAUDE.md and .claude/context/ accurate after changes to routing, the image pipeline, the photography data model, backend endpoints, or module structure. Use at the end of any change that alters project shape.
---

# Sync agent context

The previous ad-hoc handoff docs drifted badly from the real code. This skill prevents that by
updating the agent context whenever project shape changes.

## When to run

Trigger this whenever a change touches any of:

- Routing or the page inventory (`ui/src/App.tsx`, added/removed/relocated pages).
- The theme or global styling approach.
- The image pipeline (`ui/scripts/optimize-photos.js`, `ui/src/utils/photoOptimization.ts`).
- The photography data model (`ui/src/data/photography.ts`).
- Backend endpoints, models, or data files (`api/src/...`).
- Module structure, build, or environment configuration.

## Steps

1. Identify which context page(s) the change affects:
   - `.claude/context/frontend.md` — routing, pages, theme, styling, photography IA, data source.
   - `.claude/context/backend.md` — endpoints, models, data files, tests.
   - `.claude/context/image-pipeline.md` — optimizer + runtime mapping.
   - `.claude/context/architecture.md` — modules, stack, deploy, directory map, sizes.
   - `CLAUDE.md` — commands, live-vs-legacy summary, conventions, env config, pointers.

2. Update the affected page(s) to match reality. Prefer precise, verifiable statements
   (exact route paths, filenames, script constants) over vague description.

3. If a page became live or legacy, update the "Live vs legacy" notes in both `CLAUDE.md` and
   `.claude/context/frontend.md`.

4. Verify claims against the code before writing them — open the file and confirm. Do not copy
   forward numbers or names you did not check.

## Guardrails

- Keep `CLAUDE.md` concise; push detail into context pages.
- Never reintroduce stale claims (e.g. a dark-theme dashboard, `personal_info.json`, "100% AI /
  7,656 lines"). If you find such a claim, correct it.
- Update context in the same change that caused the drift, not "later".
