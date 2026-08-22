---
name: optimize-photos
description: Add, replace, or remove photography images and keep the optimized WebP assets and the static data file in sync. Use whenever files under ui/public/photos change or a photo collection needs updating.
---

# Optimize & sync photography

Use this when photos are added, replaced, renamed, or removed, or when a gallery/collection
needs to change. Context: `.claude/context/image-pipeline.md` and `.claude/context/frontend.md`.

## Steps

1. **Place the source files** under `ui/public/photos/<Folder>/`. Folders map to collections:
   - `Portfolio/` → `portfolioPhotos` (the `/photo` grid).
   - `Polaroids/`, `Portraits/`, `Studio/` → `workCategories` entries.
   - `Projects/<Project Name>/` → a `photoProjects` entry (`cover.jpg` is the cover).
   Keep originals full-resolution; the viewer serves these directly.

2. **Regenerate optimized derivatives:**
   ```bash
   npm --prefix ui run photos:optimize
   ```
   This wipes and rebuilds `ui/public/photos/optimized/`. Confirm the expected
   `[optimized] ... -> ...` lines and final count.

3. **Sync the data file** `ui/src/data/photography.ts`:
   - Add/remove `PhotoAsset` entries (`{ title, src }`) with `src` = the original
     `/photos/<Folder>/<file>` path (NOT the optimized path — the UI maps to optimized at
     runtime via `getOptimizedPhotoSrc`).
   - For a new category, add a `WorkCategory` (`slug`, `label`, `photos`).
   - For a new project, add a `PhotoProject` (`slug`, `label`, `coverSrc`, `photos`).
   - Titles are display labels; slugs are URL segments (kebab-case, matched by
     `getWorkCategoryBySlug` / `getPhotoProjectBySlug`).

4. **Verify:**
   ```bash
   npm --prefix ui run lint:check
   npm --prefix ui run build
   ```
   Spot-check routes: `/photo`, `/photo/work/<category>`, `/photo/work/projects/<slug>`.

## Notes

- Do not hand-edit anything in `ui/public/photos/optimized/`; it is generated.
- Selector background (`SiteSelectorPage` / `UnderConstructionPage`) intentionally uses the
  original, not the optimized image.
- If large monitors look soft, raise the short-edge targets in `ui/scripts/optimize-photos.js`
  and rerun.
- After the change, follow the `sync-context` skill if routing or the data model changed.
