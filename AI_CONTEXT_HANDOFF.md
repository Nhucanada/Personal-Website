# AI Handoff Context (Cross-Device Continuation)

This file is a full project handoff for a new AI session to continue work with minimal rediscovery.

## Repository Snapshot

- Repo root: `/Users/nathanhu/Dev/Personal-Website`
- Monorepo modules:
  - `ui` (React + TypeScript + MUI)
  - `api` (Spring Boot Java backend)
- Current git state at handoff time: clean working tree (`git status --short` returned no entries).

## High-Level Product State

The site is currently split into two experiences:

1. **Selector page** at `/`
2. **Photography experience** at `/photography/*`
3. **Software experience** at `/software/*` (temporarily replaced by a WIP placeholder page)

The **photography side is now frontend-static** (no runtime backend dependency for images/data).  
Backend is intentionally still present for future dynamic capabilities (form processing, uploads/admin, auth, APIs).

---

## Routing (Current)

Defined in `ui/src/App.tsx`:

- `/` → `SiteSelectorPage`
- `/software/*` → `SoftwarePlaceholderPage` for all software routes
- `/photography/*`:
  - `/photography` → redirect to `/photography/work`
  - `/photography/work` → main work grid page
  - `/photography/work/:category` → category-specific work page (`studio`, `portraits`, `sports`)
  - `/photography/about`
  - `/photography/contact`
  - `/photography/portfolio` redirects to `/photography/work` (backward compatibility)

Legacy software routes (`/about`, `/projects`, etc.) still redirect to `/software/...`.

---

## Key UX/Design Decisions Implemented

### Global
- Typography: serif stack centered around Minion Pro / Garamond.
- Theme currently **light mode** (`ui/src/App.tsx` MUI theme).

### Selector Page (`/`)
- Uses photography-style top nav and centered image composition.
- Nav left brand text: `Nathan Hu` (no period).
- Nav right links: `Software`, `Photography`.
- Background image (keeps original aspect ratio via `<img>`):
  - `ui/public/photos/selector-background.jpg`

### Photography Nav
- Left brand: `Nathan Hu` links back to selector (`/`).
- Right links: `Work`, `About`, `Contact`.
- `Portfolio` nav option removed and replaced with `Work`.

### Work Page
- Category header centered with separators:
  - `Studio | Portraits | Sports`
- Main grid and category pages use independent column flow (masonry-style via CSS columns), not strict row grid.
- Photos are in color (no grayscale filter).

### Category Pages (`/photography/work/:category`)
- Same image layout as work page.
- No category header.
- Top-left back control with arrow + `back` returns to `/photography/work`.

### About Page
- Two-column layout:
  - Left: portrait image
  - Right: descriptive text
- About title removed by request.
- Portrait currently:
  - `/photos/about-profile.jpg` (frontend public asset, not backend URL).

### Contact Page
- Two-column format similar to About:
  - Left: minimalist form
  - Right: Instagram + LinkedIn icon links
- Form fields:
  - first name, last name, email, subject, message, submit
- Input design:
  - transparent fields, underline-only style
  - labels above fields (no placeholder text)
  - first/last name are side-by-side on desktop, stacked on mobile
- Submit behavior:
  - opens `mailto:` draft to `nhucanada0628@gmail.com` with encoded subject/body.

### Software Page
- Full software section intentionally replaced with WIP placeholder page (themed similarly to photography).
- Includes embedded resume iframe.
- Resume file in repo:
  - `ui/public/documents/Nathan_Hu___Resume_January_2026__CAN.pdf`

---

## Static Photography Data (No Backend Runtime Needed)

Current source of work gallery data:

- `ui/src/data/photography.ts`
  - exports `workPhotos`
  - exports category union/type and category order

Image assets used by photography pages are in frontend public:

- `ui/public/photos/about-profile.jpg`
- `ui/public/photos/default-placeholder.jpg`
- `ui/public/photos/gold-0011.jpg`
- `ui/public/photos/selector-background.jpg`

Note: backend also contains similar placeholder copies under
`api/src/main/resources/static/photos/placeholders`, but photography frontend no longer depends on backend for those.

---

## Important Files to Read First in Next Session

- `ui/src/App.tsx`
- `ui/src/styles/photography.css`
- `ui/src/components/PhotographyNav.tsx`
- `ui/src/pages/SiteSelectorPage.tsx`
- `ui/src/pages/photography/PhotographyPortfolioPage.tsx`
- `ui/src/pages/photography/PhotographyWorkCategoryPage.tsx`
- `ui/src/pages/photography/PhotographyAboutPage.tsx`
- `ui/src/pages/photography/PhotographyContactPage.tsx`
- `ui/src/pages/software/SoftwarePlaceholderPage.tsx`
- `ui/src/data/photography.ts`

---

## Backend Status / Environment Notes

Backend still has env-based CORS and deployment configuration:

- `api/src/main/resources/application.properties`
  - `server.port=${SERVER_PORT:8080}`
  - `app.cors.allowed-origins=${APP_CORS_ALLOWED_ORIGINS:http://localhost:3000}`
- CORS centralized in:
  - `api/src/main/java/com/example/api/config/WebConfig.java`
- Controller-level hardcoded `@CrossOrigin` annotations were removed where migrated.

Frontend env:
- `ui/src/utils/api.ts` still supports `REACT_APP_API_URL`, but photography pages currently do not require it.

---

## Build / Test Commands

From repo root:

- Frontend build:
  - `npm --prefix "/Users/nathanhu/Dev/Personal-Website/ui" run build`
- Frontend dev:
  - `npm --prefix "/Users/nathanhu/Dev/Personal-Website/ui" start`
- Backend tests:
  - `mvn test -pl api`
- Backend run:
  - `mvn spring-boot:run -pl api`

---

## Known Intentional Tradeoffs

- Software site routes are intentionally “parked” behind a placeholder page while rebuilding.
- Contact submit uses `mailto:` (client-side) rather than backend email service.
- Category pages currently reuse the same photo dataset filtered by category tags (placeholder behavior by design).
- No CMS/admin UI yet; image lists are currently code/data driven.

---

## Suggested Next Steps (If Continuing)

1. Add real category-specific photo collections in `ui/src/data/photography.ts`.
2. Add a lightweight admin/upload backend flow (if desired) and wire to frontend.
3. Replace `mailto:` with backend form submission + email service (SendGrid/Postmark/etc.).
4. Restore software portfolio routes when ready by replacing `SoftwarePlaceholderPage` routing in `ui/src/App.tsx`.

