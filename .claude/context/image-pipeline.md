# Image performance pipeline

Two parts: a build-time optimizer that generates WebP derivatives, and a runtime helper that
maps original paths to optimized ones.

## Build-time optimizer

- Script: `ui/scripts/optimize-photos.js` (uses `sharp`).
- Command: `npm --prefix ui run photos:optimize`.
- Input: recursively scans `ui/public/photos`, skipping the `optimized/` subfolder.
- Supported inputs: `.jpg`, `.jpeg`, `.png`, `.webp`. HEIC/HEIF files (`.heic`, `.heif`) are
  automatically pre-converted to `.jpg` in-place using macOS `sips` before optimization — the
  original HEIC is deleted and replaced by the converted JPG.
- Output: `ui/public/photos/optimized/<same-relative-path>.webp`. The output folder is wiped
  and regenerated on each run.
- Conversion: WebP `quality: 80`, `effort: 6`; `image.rotate()` honors EXIF orientation.
- Resize (fit `inside`, `withoutEnlargement: true` — never upscales, preserves aspect ratio):
  - Landscape (`width >= height`): short edge (height) target `900`.
  - Portrait: short edge (width) target `1000`.

To sharpen large-display rendering, raise `LANDSCAPE_SHORT_EDGE` / `PORTRAIT_SHORT_EDGE` at the
top of the script and rerun.

## Runtime source mapping

- Helper: `ui/src/utils/photoOptimization.ts` → `getOptimizedPhotoSrc(src)`.
- Behavior: for a `/photos/...` path it returns `/photos/optimized/<path-without-ext>.webp`;
  any non-`/photos/` path is returned unchanged.

## Where optimized vs original images are used

Optimized (display) images:

- Photography gallery pages: `PhotographyPortfolioPage`, `PhotographyWorkCategoryPage`,
  `PhotographyCollectionsPage`, `PhotographyCollectionDetailPage`, `PhotographyCommissionedPage`,
  `PhotographyCommissionedDetailPage`, `PhotographyPortraitsPage`, `PhotographyPortraitsSubcategoryPage`,
  `PhotographySeriesPage`, `PhotographySeriesSubcategoryPage`, `PhotographyAboutPage`.

Originals (intentional full-res):

- `SiteSelectorPage` and `UnderConstructionPage` selector background.
- The full-screen viewer `PhotographyImageViewPage` (`/photo/image`) always loads the original
  from the `src` query param.

## When photos change

1. Add/replace/remove files under `ui/public/photos/<Folder>/`.
2. Rerun `npm --prefix ui run photos:optimize`.
3. Update `ui/src/data/photography.ts` if filenames/collections changed.

The `optimize-photos` skill walks through this end to end.
