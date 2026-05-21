# AI Handoff Context (Updated)

This is the current handoff snapshot for continuing work in this repository without rediscovery.

## Repository Snapshot

- Repo root: `/Users/nathanhu/Dev/Personal-Website`
- Modules:
  - `ui` (React + TypeScript + MUI, CRA)
  - `api` (Spring Boot)
- Active branches used recently: `staging`, `main`

## Current Routing / Deploy Behavior

Defined in `ui/src/App.tsx`:

- `/` → selector-style home (`SiteSelectorPage`) unless construction flag is enabled.
- Construction gate:
  - `NODE_ENV === "production"` and `REACT_APP_SITE_UNDER_CONSTRUCTION === "true"` renders `UnderConstructionPage` at `/`.
- Primary section routes:
  - `/dev/*` → `SoftwarePlaceholderPage` (WIP software section)
  - `/photo/*` → photography section
- Removed section aliases:
  - `/software/*` and `/photography/*` are no longer active route mounts.
- Legacy top-level software redirects still exist:
  - `/about`, `/projects`, `/experience`, `/education`, `/ai`, `/contact` -> `/dev/...`

Netlify SPA fallback is configured with:

- `ui/public/_redirects` containing:
  - `/* /index.html 200`

## Photography Information Architecture

### Top nav (`ui/src/components/PhotographyNav.tsx`)

- Brand left: `Nathan Hu` (links to `/`)
- Right links: `Work`, `About`, `Contact`

### Work root (`/photo`)

- `PhotographyPortfolioPage`
- Category row includes:
  - `Projects` + folder categories from data file (currently `Polaroids`, `Portraits`, `Studio`)
- Main grid at `/photo` uses **Portfolio folder images**.

### Work category pages

- `/photo/work/:category` -> `PhotographyWorkCategoryPage`
- Back button returns to `/photo`
- Masonry-like column layout via CSS columns

### Projects within Work

- `/photo/work/projects` -> `PhotographyProjectsPage`
  - Uses project folder cover images and labels
- `/photo/work/projects/:projectSlug` -> `PhotographyProjectDetailPage`
  - Shows project image set

### Expanded image view

- `/photo/image` -> `PhotographyImageViewPage`
- Click any image in portfolio/category/project detail to open expanded view.
- Uses query params:
  - `src` (original full-res image path)
  - `title`
  - `returnTo` (path to navigate back)
- Scroll locking is enabled while viewer is mounted (`document.body.style.overflow = 'hidden'` with cleanup).

## Image Performance Pipeline (Implemented)

### Build-time optimizer

- Script: `ui/scripts/optimize-photos.js`
- Command: `npm --prefix "/Users/nathanhu/Dev/Personal-Website/ui" run photos:optimize`
- Output folder: `ui/public/photos/optimized`
- Input scan: all images under `ui/public/photos` excluding `optimized`
- Conversion: WebP (quality 80, effort 6), no crop, no aspect-ratio distortion, no upscaling
- Current short-edge targets:
  - Landscape: `900`
  - Portrait: `1000`

### Runtime source mapping

- Utility: `ui/src/utils/photoOptimization.ts`
- `getOptimizedPhotoSrc("/photos/...")` -> `/photos/optimized/...webp`

### Where optimized images are used

- `SiteSelectorPage` (homepage selector image) now intentionally uses original full-res image.
- `UnderConstructionPage` now also intentionally uses original full-res selector image.
- Photography gallery and related pages use optimized display images:
  - `PhotographyHomePage` (hero and featured cards)
  - `PhotographyAboutPage`
  - `PhotographyPortfolioPage`
  - `PhotographyWorkCategoryPage`
  - `PhotographyProjectsPage`
  - `PhotographyProjectDetailPage`
- Expanded `/photo/image` view always uses original full-res source (`src` query param).

## Data Source for Photo Collections

Static data file:

- `ui/src/data/photography.ts`

Contains:

- `portfolioPhotos`
- `workCategories` (slug, label, photos)
- `photoProjects` (slug, label, cover, photos)
- helper lookups by slug

Recent sync updates removed stale Portfolio references and added newer Portfolio files.

## Typography / Styling State

- Global typography currently back to original serif stack:
  - `"Minion Pro", Garamond, "Adobe Garamond Pro", "Times New Roman", serif`
- Photography spacing and nav brand tweaks were reverted to original behavior.
- Expanded image page uses same background token as photography pages and back-button row aligned to match category pages.

## Most Relevant Files to Read First

- `ui/src/App.tsx`
- `ui/src/styles/photography.css`
- `ui/src/data/photography.ts`
- `ui/src/utils/photoOptimization.ts`
- `ui/scripts/optimize-photos.js`
- `ui/src/pages/SiteSelectorPage.tsx`
- `ui/src/pages/UnderConstructionPage.tsx`
- `ui/src/pages/photography/PhotographyPortfolioPage.tsx`
- `ui/src/pages/photography/PhotographyWorkCategoryPage.tsx`
- `ui/src/pages/photography/PhotographyProjectsPage.tsx`
- `ui/src/pages/photography/PhotographyProjectDetailPage.tsx`
- `ui/src/pages/photography/PhotographyImageViewPage.tsx`

## Commands

From repo root:

- Frontend dev:
  - `npm --prefix "/Users/nathanhu/Dev/Personal-Website/ui" start`
- Frontend build:
  - `npm --prefix "/Users/nathanhu/Dev/Personal-Website/ui" run build`
- Lint:
  - `npm --prefix "/Users/nathanhu/Dev/Personal-Website/ui" run lint`
- Generate optimized photos:
  - `npm --prefix "/Users/nathanhu/Dev/Personal-Website/ui" run photos:optimize`

## Notes for Next Session

- If photos are changed in `ui/public/photos`, rerun `photos:optimize` and resync `ui/src/data/photography.ts` entries if file names changed.
- If display quality is still soft on large monitors, increase short-edge targets in `ui/scripts/optimize-photos.js` again.
- If future route changes happen, update this handoff immediately to keep it trustworthy.

