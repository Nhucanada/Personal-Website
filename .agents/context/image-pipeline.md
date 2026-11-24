# Image performance pipeline

Two parts: a build-time optimizer that generates JPEG derivatives, and a runtime helper that
maps original paths to optimized ones.

## Build-time optimizer

- Script: `scripts/optimize-photos.cjs` (uses `sharp` + macOS `sips`).
- Command: `npm run photos:optimize`.
- Input: recursively scans `public/photos`, skipping the `optimized/` subfolder.
- Supported inputs: `.jpg`, `.jpeg`, `.png`, `.webp`. HEIC/HEIF files (`.heic`, `.heif`) are
  automatically pre-converted to `.jpg` in-place using macOS `sips` before optimization — the
  original HEIC is deleted and replaced by the converted JPG.
- Output: `public/photos/optimized/<same-relative-path>.jpg`. The output folder is wiped
  and regenerated on each run.
- Conversion: JPEG via mozjpeg; `image.rotate()` honors EXIF orientation. All outputs are
  converted to sRGB (`.toColorspace('srgb')`) and tagged with an embedded sRGB ICC profile
  (`.withMetadata({ icc: 'srgb' })`). Grid and viewer tiers both use JPEG `quality: 95`.
- Resize (fit `inside`, `withoutEnlargement: true` — never upscales, preserves aspect ratio):
  - Grid (`optimized/`): max width `900` (height scales proportionally).
  - Viewer (`optimized/viewer/`): max height `1500` (width scales proportionally).

## Runtime source mapping

- Helper: `src/utils/photoOptimization.ts`
  - `getOptimizedPhotoSrc(src)` → grid JPEG under `/photos/optimized/...`
  - `getViewerPhotoSrc(src)` → viewer JPEG under `/photos/optimized/viewer/...` (max height 1500px)
- Behavior: for a `/photos/...` path it returns `/photos/optimized/<path-without-ext>.jpg`;
  any non-`/photos/` path is returned unchanged.

## Where optimized vs original images are used

Grid-tier JPEG (max width 900px, via `getOptimizedPhotoSrc`):

- Photography gallery pages: `PhotographyPortfolioPage`, `PhotographyWorkCategoryPage`,
  `PhotographyCollectionsPage`, `PhotographyCollectionDetailPage`, `PhotographyCommissionedPage`,
  `PhotographyCommissionedDetailPage`, `PhotographyPeoplePage`, `PhotographyPeopleSubcategoryPage`,
  `PhotographySeriesPage`, `PhotographySeriesSubcategoryPage`, `PhotographyAboutPage`.

Viewer-tier JPEG (max height 1500px, via `getViewerPhotoSrc`):

- `PhotographyImageViewPage`.
- `PhotographyHomePage` hero image (`getViewerPhotoSrc('/photos/selector-background.jpg')`).
- `SiteSelectorPage` photography layer (`getViewerPhotoSrc('/photos/selector-background.jpg')`).

Originals (full-res):

- `UnderConstructionPage` selector background (`/photos/selector-background.jpg`).

## When photos change

1. Add/replace/remove files under `public/photos/<Folder>/`.
2. Rerun `npm run photos:optimize`.
3. Update `src/data/photography.ts` if filenames/collections changed.

The `optimize-photos` skill walks through this end to end.
