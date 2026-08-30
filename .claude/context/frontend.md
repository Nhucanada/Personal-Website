# Frontend

Entry: `ui/src/index.tsx` → `ui/src/App.tsx`. All routing and the MUI theme are defined in
`App.tsx`.

## Theme (light)

`App.tsx` creates a **light** MUI theme:

- `palette.mode: 'light'`, primary `#4f5d73`, secondary `#8b6f47`.
- Background `#f6f4ef` (default) / `#ffffff` (paper); text `#1f1f1f`.
- Typography: serif stack `"Minion Pro", Garamond, "Adobe Garamond Pro", "Times New Roman", serif`.
- Component overrides for Button (no text-transform), Card, Paper, AppBar, Chip.

There is no dark theme in the live app (any doc claiming `#0a0a0a`/`#1a1a1a` dark mode is stale).

## Routing

Top-level routes in `App.tsx`:

- `/` → `UnderConstructionPage` if `NODE_ENV === 'production'` **and**
  `REACT_APP_SITE_UNDER_CONSTRUCTION === 'true'`, otherwise `SiteSelectorPage`.
- `/dev/*` → software layout (`SoftwareNav` + nested routes below).
- `/photo/*` → photography layout (`PhotographyNav` + nested routes below).
- Legacy redirects: `/about`, `/projects`, `/experience`, `/education`, `/ai`, `/contact`
  → `/dev/...` equivalents.
- `*` → redirect to `/`.

Software nested routes (under `/dev`):

- index → `SoftwareHomePage`
- `about` → `SoftwareAboutPage`
- `projects` → `SoftwareProjectsPage`
- `work` → `SoftwareExperiencePage` ← dedicated work/experience page
- `experience` → redirect to `/dev/work` (backwards compat)
- `contact` → `SoftwareContactPage`
- `resume` → redirect to `/dev`
- `*` → redirect to `/dev`

Photography nested routes (under `/photo`):

- index → `PhotographyHomePage` ← landing page for the section
- `work` → `PhotographyPortfolioPage` ← portfolio grid (was redirect to `/photo`)
- `work/collections` → `PhotographyCollectionsPage`
- `work/collections/:collectionSlug` → `PhotographyCollectionDetailPage`
- `work/campaigns` → redirect to `/photo/work/collections` (backwards compat)
- `work/campaigns/:campaignSlug` → redirect to `/photo/work/collections/:campaignSlug` (backwards compat)
- `work/projects` → redirect to `/photo/work/collections` (backwards compat)
- `work/projects/:projectSlug` → redirect to `/photo/work/collections/:projectSlug` (backwards compat)
- `work/commissioned` → `PhotographyCommissionedPage`
- `work/commissioned/:collectionSlug` → `PhotographyCommissionedDetailPage`
- `work/portraits` → `PhotographyPortraitsPage`
- `work/portraits/:subcategory` → `PhotographyPortraitsSubcategoryPage`
- `work/series` → `PhotographySeriesPage`
- `work/series/:subcategory` → `PhotographySeriesSubcategoryPage`
- `work/:category` → `PhotographyWorkCategoryPage`
- `portfolio` → redirect to `/photo`
- `image` → `PhotographyImageViewPage`
- `about` → `PhotographyAboutPage`
- `contact` → `PhotographyContactPage`

## Page inventory

All of `ui/src` is live; the old dashboard pages/components/hooks/API client were removed.

- `pages/SiteSelectorPage.tsx` — split-screen mouse-driven landing selector. Two full-viewport
  layers stacked: photography (front, clipped with `clip-path: inset()`) over software (back,
  always full-width). Movement is **inverted** (mouse left → more photography; mouse right →
  more software). Each layer uses the **real** nav components' CSS classes (`photo-nav`,
  `sw-nav`) — only `position: fixed` is overridden to `absolute` in `selector.css`. Divider
  line removed; instead the inactive side dims via a black overlay driven by the rAF loop and
  a section-name label fades in centred in the dim strip. Split movement is capped at
  `MIN_X=33 / MAX_X=67` so the dim side is always ≥ 1/3 of the viewport. Click left →
  `/photo`; click right → `/dev`. Touch/hover:none: static 50/50 `<Link>` split. Styles in
  `ui/src/styles/selector.css`.
- `pages/UnderConstructionPage.tsx` — mirrors selector layout; also full-res selector image.
- `pages/photography/PhotographyHomePage.tsx` — `/photo` index. Replicates original homepage:
  warm `#f6f4ef` background, `selector-background.jpg` centered via `.selector-image-wrap` /
  `.selector-image` classes from `photography.css`. `PhotographyNav` is rendered by App.tsx.
- `pages/photography/PhotographyPortfolioPage.tsx` — `/photo/work` portfolio grid.
- `pages/photography/PhotographyWorkCategoryPage.tsx` — `/photo/work/:category`, CSS-columns masonry.
- `pages/photography/PhotographyCollectionsPage.tsx` — collection covers.
- `pages/photography/PhotographyCollectionDetailPage.tsx` — a collection's image set.
- `pages/photography/PhotographyCommissionedPage.tsx` — commissioned collection covers at `/photo/work/commissioned`.
- `pages/photography/PhotographyCommissionedDetailPage.tsx` — a commissioned collection's image set at `/photo/work/commissioned/:collectionSlug`.
- `pages/photography/PhotographyPortraitsPage.tsx` — portraits hub at `/photo/work/portraits` with Location/Studio subcategory links.
- `pages/photography/PhotographyPortraitsSubcategoryPage.tsx` — portrait subcategory grid at `/photo/work/portraits/:subcategory`.
- `pages/photography/PhotographySeriesPage.tsx` — series hub at `/photo/work/series` with Street/Motorsport/Landscape subcategory links.
- `pages/photography/PhotographySeriesSubcategoryPage.tsx` — series subcategory grid at `/photo/work/series/:subcategory`.
- `pages/photography/PhotographyImageViewPage.tsx` — full-screen viewer at `/photo/image`.
- `pages/photography/PhotographyAboutPage.tsx`, `PhotographyContactPage.tsx`.
- `pages/software/SoftwareHomePage.tsx` — `/dev` index. Two stacked sections: first screen
  (`.sw-home-visual`) mirrors the selector right side — dark `#0d0f14` dot-grid bg, centered
  placeholder box (`min(72vw, 980px)`, same sizing as photography selector image); second screen
  (`.sw-hero`) has the existing bio text and CTA buttons (scrollable).
- `pages/software/SoftwareAboutPage.tsx` — bio + skills two-column layout.
- `pages/software/SoftwareProjectsPage.tsx` — filterable project card grid from static data.
- `pages/software/SoftwareExperiencePage.tsx` — timeline-style experience cards from static data.
- `pages/software/SoftwareContactPage.tsx` — dark contact form + social links (GitHub/LinkedIn/Email).
- `components/PhotographyNav.tsx` — brand `Nathan Hu` (→ `/`), links Work (→ `/photo/work`) /
  About / Contact. `isPathActive` for Work checks `pathname.startsWith('/photo/work')`.
- `components/SoftwareNav.tsx` — brand `Nathan Hu` (→ `/`), links Work/Projects/About/Contact + Résumé button.

There are currently no frontend test files (the old dashboard test suite was removed with the
pages it covered). `ui/src/setupTests.ts` remains as CRA scaffolding for future tests.

## Photography information architecture

- `/photo` → `PhotographyHomePage` (landing; shows `selector-background.jpg`).
- `/photo/work` → `PhotographyPortfolioPage` (portfolio grid from `portfolioPhotos`).
- Category row on portfolio: `Collections` + `Commissioned` + folder categories from data (`Polaroids`, `Portraits`, `Series`).
- Category pages use a photo grid layout; back button returns to `/photo/work`.
- Portraits (`/photo/work/portraits`) is a hub with subcategory links (`Location`, `Studio`) formatted like the work category row, plus a photo grid from `portraitPhotos` (root-level images in `Portraits/`). Subcategory pages at `/photo/work/portraits/:subcategory` show the photo grid; back returns to `/photo/work/portraits`. Source images live under `ui/public/photos/Portraits/`, `Portraits/Location/`, and `Portraits/Studio/`.
- Series (`/photo/work/series`) mirrors Portraits: hub with subcategory links (`Street`, `Motorsport`, `Landscape`) plus a photo grid from `seriesPhotos` (root-level images in `Series/`). Subcategory pages at `/photo/work/series/:subcategory` show the photo grid; back returns to `/photo/work/series`. Source images live under `ui/public/photos/Series/`, `Series/Street/`, `Series/Motorsport/`, and `Series/Landscape/`.
- Collections section (`/photo/work/collections`): cover grid → detail grid. Detail back returns to `/photo/work/collections`. Data in `photoCollections`; lookup via `getPhotoCollectionBySlug`. Source images live under `ui/public/photos/Projects/<Collection Name>/`.
- Commissioned section (`/photo/work/commissioned`): cover grid → detail grid. Detail back returns to `/photo/work/commissioned`. Data in `photoCommissioned`; lookup via `getCommissionedBySlug`. Source images live under `ui/public/photos/Commissioned/<Collection Name>/`.
- Clicking any image opens `/photo/image` with query params `src` (original full-res),
  `title`, and `returnTo`. The viewer locks body scroll while mounted and always shows the
  original (non-optimized) image.

## Styling

- Photography styles live in `ui/src/styles/photography.css` (classes like `photo-site`,
  `photo-nav`, `photo-body`, `selector-image-wrap`, `selector-image`). The selector homepage
  classes (`.selector-image-wrap`, `.selector-image`) are reused by `PhotographyHomePage`.
- Selector styles live in `ui/src/styles/selector.css` (classes prefixed `sel-`). Imported
  only by `SiteSelectorPage.tsx`. Contains the two-layer split stack, per-layer navs, divider
  bar, mobile touch fallback, and nav link styles for both sections.
- Software styles live in `ui/src/styles/software.css` (classes prefixed `sw-`). This file
  defines its own dark CSS custom properties (`--sw-bg`, `--sw-accent`, `--sw-font-mono`, etc.)
  and is completely independent of `photography.css`. Added in this session: `.sw-home-visual`,
  `.sw-home-placeholder`, `.sw-home-ph-eyebrow`, `.sw-home-ph-name`, `.sw-home-ph-sub` for the
  homepage visual section. The software section does not use MUI `sx`.
- The selector/photography pages share class-based styles from `photography.css` rather than MUI `sx`.

## Data source

Static photo data: `ui/src/data/photography.ts`, exporting:

- `portfolioPhotos: PhotoAsset[]`
- `workCategories: WorkCategory[]` (slug, label, photos)
- `portraitPhotos: PhotoAsset[]` (root-level portraits on the hub page)
- `portraitSubcategories: WorkCategory[]` (slug, label, photos — Location, Studio)
- `seriesPhotos: PhotoAsset[]` (root-level series on the hub page)
- `seriesSubcategories: WorkCategory[]` (slug, label, photos — Street, Motorsport, Landscape)
- `photoCollections: PhotoProject[]` (slug, label, coverSrc, photos)
- `photoCommissioned: PhotoProject[]` (same interface; slug, label, coverSrc, photos)
- lookups `getWorkCategoryBySlug`, `getPortraitSubcategoryBySlug`, `getSeriesSubcategoryBySlug`, `getPhotoCollectionBySlug`, `getCommissionedBySlug`

Image `src` values are `/photos/...` paths resolved at runtime through the optimizer helper
(see `image-pipeline.md`). When photo files are added/removed/renamed, update this file and
rerun the optimizer.

Static software data: `ui/src/data/software.ts`, exporting:

- `projects: SoftwareProject[]` — id, title, description, tech, github?, url?, featured
- `experiences: WorkExperience[]` — id, company, role, location, dates, bullets, tech?, type
- `skillGroups: SkillGroup[]` — category, items[]

All three are static arrays; no API call is made. Update them directly when content changes.

## Software section theme

The software section (`/dev/*`) is dark-mode and uses `ui/src/styles/software.css` exclusively.
Key variables: `--sw-bg: #0d0f14`, `--sw-accent: #64d4e8` (teal), `--sw-surface: #161b24`.
Fonts loaded via Google Fonts in `ui/public/index.html`: Inter (body) and JetBrains Mono
(eyebrow labels, monospace chips, dates). The global MUI theme remains light and is used only
by the photography section.

## Selector implementation notes

The `SiteSelectorPage` animation is driven by a `requestAnimationFrame` loop with no external
dependencies. Key gotchas:

- **Inverted mouse**: `targetX = 100 - mouseXPercent`. Moving left → split moves right →
  more photography visible. Do not "fix" this — it is intentional per design.
- **Nav classes — never duplicate**: the selector uses the real `.photo-nav` / `.sw-nav`
  CSS classes imported from `photography.css` and `software.css`. The only override in
  `selector.css` is `position: absolute; z-index: 5` (replacing the real `position: fixed;
  z-index: 10`). If you add or change nav styles, edit the source CSS files only — they
  automatically apply to both the section pages and the selector.
- **Dim overlay + labels**: a `sel-dim-overlay` div (z-index 6) and a `sel-side-label` div
  (z-index 7) live inside each layer. The rAF loop drives their `opacity` and the label's
  `left` position every frame to keep it centred in the dim strip.
- **Split cap**: `targetX` is clamped to `[MIN_X=33, MAX_X=67]` during hover so the dim side
  is always ≥ 1/3 of the viewport. The cap is removed during click transitions (0 / 100).
- **clip-path and pointer events**: `clip-path: inset()` on the photography layer clips
  hit-testing in modern browsers — the hidden right portion does not intercept clicks, so the
  software nav behind it is clickable. Do not add `pointer-events: none` to the photo layer.
- **Nav stopPropagation**: both in-layer navs call `e.stopPropagation()` on click so nav link
  navigation doesn't also fire the container's split-click handler.
- **CSS url() in CRA**: never put `url("/photos/...")` in `.css` files — CRA webpack tries to
  resolve it at build time and fails. Set `backgroundImage` via inline React style instead.
- **software placeholder**: `.sel-sw-placeholder` and `.sw-home-placeholder` both use
  `min(72vw, 980px)` width — same as `.selector-image` — so the two homepages feel symmetric.
  Replace these with `<img>` elements once a real software background image exists.
