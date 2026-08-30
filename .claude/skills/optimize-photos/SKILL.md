---
name: optimize-photos
description: Add, replace, or remove photography images and keep the optimized JPEG assets and the static data file in sync. Use whenever files under ui/public/photos change or a photo collection needs updating.
---

# Optimize & sync photography

Use this when photos are added, replaced, renamed, or removed, or when a gallery/collection
needs to change. Context: `.claude/context/image-pipeline.md` and `.claude/context/frontend.md`.

## Steps

1. **Place the source files** under `ui/public/photos/<Folder>/`. Folders map to collections:
   - `Portfolio/` → `portfolioPhotos` (the `/photo` grid).
   - `Polaroids/` → `workCategories` entries.
   - `Portraits/` (root) → `peoplePhotos` (hub grid on `/photo/work/people`).
   - `Portraits/Location/`, `Portraits/Studio/` → `peopleSubcategories` entries.
   - `Series/` (root) → `seriesPhotos` (hub grid on `/photo/work/series`).
   - `Series/Street/`, `Series/Motorsport/`, `Series/Landscape/` → `seriesSubcategories` entries.
   - `Projects/<Collection Name>/` → a `photoCollections` entry (`cover.jpg` is the cover).
   - `Commissioned/<Collection Name>/` → a `photoCommissioned` entry (first alphabetical file is cover if no `cover.jpg`).
   Keep originals full-resolution; the viewer serves these directly.
   HEIC/HEIF files are automatically converted to JPG by the optimizer (via `sips`), replacing
   the original in-place before JPEG optimization.

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
   - For a new people subcategory, add a `WorkCategory` to `peopleSubcategories`.
   - For root-level people photos on the hub page, add `PhotoAsset` entries to `peoplePhotos`.
   - For a new series subcategory, add a `WorkCategory` to `seriesSubcategories`.
   - For root-level series on the hub page, add `PhotoAsset` entries to `seriesPhotos`.
   - For a new collection, add a `PhotoProject` to `photoCollections` (`slug`, `label`, `coverSrc`, `photos`).
   - For a new commissioned collection, add a `PhotoProject` to `photoCommissioned` (same interface).
   - Titles are display labels; slugs are URL segments (kebab-case, matched by
     `getWorkCategoryBySlug` / `getPhotoCollectionBySlug`).

4. **Verify:**
   ```bash
   npm --prefix ui run lint:check
   npm --prefix ui run build
   ```
   Spot-check routes: `/photo`, `/photo/work/<category>`, `/photo/work/collections/<slug>`, `/photo/work/commissioned/<slug>`, `/photo/work/people/<subcategory>`, `/photo/work/series/<subcategory>`.

## Notes

- Do not hand-edit anything in `ui/public/photos/optimized/`; it is generated.
- Selector background (`SiteSelectorPage` / `UnderConstructionPage`) intentionally uses the
  original, not the optimized image.
- If large monitors look soft, raise the short-edge targets in `ui/scripts/optimize-photos.js`
  and rerun.
- After the change, follow the `sync-context` skill if routing or the data model changed.
