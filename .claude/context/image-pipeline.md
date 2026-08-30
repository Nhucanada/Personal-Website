# Image performance pipeline

Two parts: a build-time optimizer that generates JPEG derivatives, and a runtime helper that
maps original paths to optimized ones.

## Build-time optimizer

- Script: `ui/scripts/optimize-photos.js` (uses `sharp`).
- Command: `npm --prefix ui run photos:optimize`.
- Input: recursively scans `ui/public/photos`, skipping the `optimized/` subfolder.
- Supported inputs: `.jpg`, `.jpeg`, `.png`, `.webp`. HEIC/HEIF files (`.heic`, `.heif`) are
  automatically pre-converted to `.jpg` in-place using macOS `sips` before optimization — the
  original HEIC is deleted and replaced by the converted JPG.
- Output: `ui/public/photos/optimized/<same-relative-path>.jpg`. The output folder is wiped
  and regenerated on each run.
- Conversion: JPEG via mozjpeg; `image.rotate()` honors EXIF orientation. All outputs are
  converted to sRGB (`.toColorspace('srgb')`) and tagged with an embedded sRGB ICC profile
  (`.withMetadata({ icc: 'srgb' })`). Grid and viewer tiers both use JPEG `quality: 95`.
- Resize (fit `inside`, `withoutEnlargement: true` — never upscales, preserves aspect ratio):
  - Grid (`optimized/`): max width `900` (height scales proportionally).
  - Viewer (`optimized/viewer/`): max height `1500` (width scales proportionally).

To sharpen large-display rendering, raise `GRID_MAX_WIDTH` / `VIEWER_MAX_HEIGHT` at the
top of the script and rerun.

## Runtime source mapping

- Helper: `ui/src/utils/photoOptimization.ts`
  - `getOptimizedPhotoSrc(src)` → grid JPEG under `/photos/optimized/...`
  - `getViewerPhotoSrc(src)` → viewer JPEG under `/photos/optimized/viewer/...` (max height 1500px)
- Behavior: for a `/photos/...` path it returns `/photos/optimized/<path-without-ext>.jpg`;
  any non-`/photos/` path is returned unchanged.

## Where optimized vs original images are used

Optimized (display) images:

- Photography gallery pages: `PhotographyPortfolioPage`, `PhotographyWorkCategoryPage`,
  `PhotographyCollectionsPage`, `PhotographyCollectionDetailPage`, `PhotographyCommissionedPage`,
  `PhotographyCommissionedDetailPage`, `PhotographyPeoplePage`, `PhotographyPeopleSubcategoryPage`,
  `PhotographySeriesPage`, `PhotographySeriesSubcategoryPage`, `PhotographyAboutPage`.

Originals (intentional full-res):

- `SiteSelectorPage` and `UnderConstructionPage` selector background.

Viewer-tier JPEG (max height 1500px):

- `PhotographyImageViewPage` via `getViewerPhotoSrc`.
- `PhotographyHomePage` selector image via `getViewerPhotoSrc('/photos/selector-background.jpg')`.

## When photos change

1. Add/replace/remove files under `ui/public/photos/<Folder>/`.
2. Rerun `npm --prefix ui run photos:optimize`.
3. Update `ui/src/data/photography.ts` if filenames/collections changed.

The `optimize-photos` skill walks through this end to end.
