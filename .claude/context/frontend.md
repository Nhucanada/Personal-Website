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
- `/dev/*` → `SoftwarePlaceholderPage` (index and wildcard both render the placeholder).
- `/photo/*` → photography layout (`PhotographyNav` + nested routes below).
- Legacy redirects: `/about`, `/projects`, `/experience`, `/education`, `/ai`, `/contact`
  → `/dev/...` equivalents.
- `*` → redirect to `/`.

Photography nested routes (under `/photo`):

- index → `PhotographyPortfolioPage`
- `work` → redirect to `/photo`
- `work/projects` → `PhotographyProjectsPage`
- `work/projects/:projectSlug` → `PhotographyProjectDetailPage`
- `work/:category` → `PhotographyWorkCategoryPage`
- `portfolio` → redirect to `/photo`
- `image` → `PhotographyImageViewPage`
- `about` → `PhotographyAboutPage`
- `contact` → `PhotographyContactPage`

## Page inventory

All of `ui/src` is live; the old dashboard pages/components/hooks/API client were removed.

- `pages/SiteSelectorPage.tsx` — landing selector; uses full-res `/photos/selector-background.jpg`.
- `pages/UnderConstructionPage.tsx` — mirrors selector layout; also full-res selector image.
- `pages/software/SoftwarePlaceholderPage.tsx` — WIP stub; embeds
  `/documents/Nathan_Hu___Resume_January_2026__CAN.pdf`.
- `pages/photography/PhotographyPortfolioPage.tsx` — `/photo` grid (portfolio folder images).
- `pages/photography/PhotographyWorkCategoryPage.tsx` — `/photo/work/:category`, CSS-columns masonry.
- `pages/photography/PhotographyProjectsPage.tsx` — project covers.
- `pages/photography/PhotographyProjectDetailPage.tsx` — a project's image set.
- `pages/photography/PhotographyImageViewPage.tsx` — full-screen viewer at `/photo/image`.
- `pages/photography/PhotographyAboutPage.tsx`, `PhotographyContactPage.tsx`.
- `components/PhotographyNav.tsx` — brand `Nathan Hu` (→ `/`), links Work/About/Contact.

There are currently no frontend test files (the old dashboard test suite was removed with the
pages it covered). `ui/src/setupTests.ts` remains as CRA scaffolding for future tests.

## Photography information architecture

- `/photo` shows the portfolio grid from `portfolioPhotos`.
- Category row: `Projects` + folder categories from data (`Polaroids`, `Portraits`, `Studio`).
- Category pages use a masonry-like CSS-columns layout; back button returns to `/photo`.
- Clicking any image opens `/photo/image` with query params `src` (original full-res),
  `title`, and `returnTo`. The viewer locks body scroll while mounted and always shows the
  original (non-optimized) image.

## Styling

- Photography styles live in `ui/src/styles/photography.css` (classes like `photo-site`,
  `photo-nav`, `photo-body`, `software-placeholder-layout`, `software-resume-frame`).
- The selector/software/photography pages share these class-based styles rather than MUI `sx`.

## Data source

Static photo data: `ui/src/data/photography.ts`, exporting:

- `portfolioPhotos: PhotoAsset[]`
- `workCategories: WorkCategory[]` (slug, label, photos)
- `photoProjects: PhotoProject[]` (slug, label, coverSrc, photos)
- lookups `getWorkCategoryBySlug`, `getPhotoProjectBySlug`

Image `src` values are `/photos/...` paths resolved at runtime through the optimizer helper
(see `image-pipeline.md`). When photo files are added/removed/renamed, update this file and
rerun the optimizer.
