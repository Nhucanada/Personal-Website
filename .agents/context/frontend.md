# Frontend

Entry: `index.html` → `src/index.tsx` → `src/App.tsx`. Global reset styles live in
`src/styles/base.css` and all routing lives in `src/App.tsx` (`App` and `AppRoutes`).

## Styling & Icons

- Global reset (`src/styles/base.css`): `box-sizing: border-box`, warm light default background
  (`#f6f4ef`), dark text (`#1f1f1f`), and serif font stack
  `"Minion Pro", Garamond, "Adobe Garamond Pro", "Times New Roman", serif`.
- Photography styles: `src/styles/photography.css` (`photo-site`, `photo-nav`, `photo-body`,
  `selector-image-wrap`, `selector-image`).
- Selector styles: `src/styles/selector.css` (classes prefixed `sel-`).
- Software styles: `src/styles/software.css` (classes prefixed `sw-`, dark theme variables
  `--sw-bg: #0d0f14`, `--sw-accent: #64d4e8`, `--sw-surface: #161b24`, Inter + JetBrains Mono).
- Icons: `src/components/Icons.tsx` exports zero-dependency inline SVG components
  (`ArrowBackIcon`, `GitHubIcon`, `LinkedInIcon`, `InstagramIcon`, `EmailIcon`, `OpenInNewIcon`).

## Routing

Top-level routes in `src/App.tsx` (driven by production feature flags in `src/utils/featureFlags.ts`):

- `/` →
  - `UnderConstructionPage` if in `PROD` and `VITE_SITE_UNDER_CONSTRUCTION=true` (or both section flags are `true`).
  - Redirects to `/photo` if in `PROD` and `VITE_SWE_UNDER_CONSTRUCTION=true` (current `.env.production` default).
  - Redirects to `/dev` if in `PROD` and `VITE_PHOTO_UNDER_CONSTRUCTION=true`.
  - Otherwise `SiteSelectorPage`.
- `/dev/*` → software layout (`SoftwareNav` + nested routes below), or redirects to `/photo` (or `/` if full site is under construction) when SWE is disabled in `PROD`.
- `/photo/*` → photography layout (`PhotographyNav` + nested routes below), or redirects to `/dev` (or `/` if full site is under construction) when Photography is disabled in `PROD`.
- Legacy redirects: `/about`, `/projects`, `/experience`, `/education`, `/ai`, `/contact`
  → `/dev/...` equivalents (which chain-redirect to `/photo` when SWE is disabled in `PROD`).
- `*` → redirect to `/`.
- Nav brand links (`PhotographyNav`, `SoftwareNav`): point to `/` (site selector) when both sections are enabled, or to the active section root (`/photo` or `/dev`) when the selector is disabled.

Software nested routes (under `/dev`):

- index → `SoftwareHomePage`
- `about` → `SoftwareAboutPage`
- `projects` → `SoftwareProjectsPage`
- `work` → `SoftwareExperiencePage`
- `experience` → redirect to `/dev/work`
- `contact` → `SoftwareContactPage`
- `resume` → redirect to `/dev`
- `*` → redirect to `/dev`

Photography nested routes (under `/photo`):

- index → `PhotographyHomePage`
- `work` → `PhotographyPortfolioPage`
- `work/collections` → `PhotographyCollectionsPage`
- `work/collections/:collectionSlug` → `PhotographyCollectionDetailPage`
- `work/campaigns` → redirect to `/photo/work/collections`
- `work/campaigns/:campaignSlug` → redirect to `/photo/work/collections/:campaignSlug`
- `work/projects` → redirect to `/photo/work/collections`
- `work/projects/:projectSlug` → redirect to `/photo/work/collections/:projectSlug`
- `work/commissioned` → `PhotographyCommissionedPage`
- `work/commissioned/:collectionSlug` → `PhotographyCommissionedDetailPage`
- `work/people` → `PhotographyPeoplePage`
- `work/people/:subcategory` → `PhotographyPeopleSubcategoryPage`
- `work/portraits` → redirect to `/photo/work/people`
- `work/portraits/:subcategory` → redirect to `/photo/work/people/:subcategory`
- `work/series` → `PhotographySeriesPage`
- `work/series/:subcategory` → `PhotographySeriesSubcategoryPage`
- `work/:category` → `PhotographyWorkCategoryPage`
- `portfolio` → redirect to `/photo`
- `image` → `PhotographyImageViewPage`
- `about` → `PhotographyAboutPage`
- `contact` → `PhotographyContactPage`

## Page & component inventory

- `src/pages/SiteSelectorPage.tsx` — split-screen mouse-driven landing selector. Two full-viewport
  layers stacked: photography (front, clipped with `clip-path: inset()`) over software (back,
  full-width). Movement is **inverted** (mouse left → more photography; mouse right → more software)
  and capped at `[MIN_X=33, MAX_X=67]`. Uses viewer-tier `selector-background.jpg` via
  `getViewerPhotoSrc` and lazy-loads `SoftwareThreeScene`.
- `src/pages/UnderConstructionPage.tsx` — mirrors selector layout with full-res selector image.
- `src/pages/photography/*` — `PhotographyHomePage`, `PhotographyPortfolioPage`,
  `PhotographyWorkCategoryPage`, `PhotographyCollectionsPage`, `PhotographyCollectionDetailPage`,
  `PhotographyCommissionedPage`, `PhotographyCommissionedDetailPage`, `PhotographyPeoplePage`,
  `PhotographyPeopleSubcategoryPage`, `PhotographySeriesPage`, `PhotographySeriesSubcategoryPage`,
  `PhotographyImageViewPage`, `PhotographyAboutPage`, `PhotographyContactPage`.
- `src/pages/software/*` — `SoftwareHomePage` (lazy-loaded interactive Three.js room + scrollable
  hero), `SoftwareAboutPage`, `SoftwareProjectsPage`, `SoftwareExperiencePage`, `SoftwareContactPage`.
- `src/components/*` — `PhotographyNav.tsx`, `SoftwareNav.tsx`, `SoftwareThreeScene.tsx`, `Icons.tsx`.
- All résumé links across `SoftwareNav`, `SiteSelectorPage`, `SoftwareHomePage`, and
  `SoftwareAboutPage` point to `/documents/Nathan_Hu_Resume.pdf`.

## Tests

Vitest + React Testing Library tests live alongside source files:

- `src/setupTests.ts` — JSDOM mocks (`matchMedia`, `IntersectionObserver`, `ResizeObserver`).
- `src/utils/photoOptimization.test.ts` — unit tests for grid and viewer path resolution.
- `src/utils/featureFlags.test.ts` — unit tests for production and section-level construction flags.
- `src/App.test.tsx` — routing, feature flag redirects, and legacy redirect tests via `MemoryRouter` + `AppRoutes`.
- `src/pages/SiteSelectorPage.test.tsx` — split-screen selector rendering and link verification.
- `src/pages/software/SoftwareProjectsPage.test.tsx` — project rendering and filter toggle tests.
