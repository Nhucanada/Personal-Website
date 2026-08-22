# Architecture

## Modules

Root is a Maven multi-module project (`pom.xml`, packaging `pom`, Java 11, UTF-8) declaring:

- `api` — Spring Boot 2.7 REST API.
- `ui` — React 18 + TypeScript frontend (Create React App via `react-scripts` 5).

`ui` also has its own `pom.xml` (frontend-maven-plugin) so `mvn clean install` can build the
frontend, but day-to-day frontend work uses npm directly.

## Approximate size (2026-08-22)

- `ui/src` (`.ts`/`.tsx`): ~0.9k lines (after removing the unused dashboard pages/tests).
- `api/src` (`.java`): ~2.1k lines.
- Backend JSON data: ~0.3k lines.
- Backend has ~49 `@Test` methods across unit + integration suites. There are currently no
  frontend tests.

(These are ground-truth counts, not the inflated "100% AI / 7,656 line" figures from the
removed tracking doc.)

## Frontend tech stack

- React 18 (`createRoot`, `StrictMode`) — entry `ui/src/index.tsx`.
- TypeScript 4.9, strict.
- Material UI 5 (`@mui/material`, `@mui/icons-material`, `@mui/lab`) + Emotion.
- React Router 6.
- `sharp` (devDependency) for the build-time photo optimizer script.
- ESLint (`ui/.eslintrc.js`) with import + jsx-a11y + react-hooks plugins.
- Jest + React Testing Library (via CRA).

## Backend tech stack

- Spring Boot 2.7, Java 11.
- Jackson `ObjectMapper` for loading JSON resources.
- JUnit + Mockito + MockMvc.
- Serves static assets from `api/src/main/resources/static`.

## Deploy topology

Frontend and backend deploy independently:

- Frontend: static build (`ui/build`) served by any static host; Netlify SPA fallback via
  `ui/public/_redirects`.
- Backend: standalone JAR with embedded Tomcat.
- They connect via `REACT_APP_API_URL` (frontend) and `APP_CORS_ALLOWED_ORIGINS` (backend).

Note: the live photography frontend is currently driven by the static data file
`ui/src/data/photography.ts`, not by live API calls. The backend photography endpoints exist
but the shipped photography pages read local data. Keep this in mind before assuming the UI
depends on the API being up.

## Directory map

```
/
├── pom.xml                     # root multi-module Maven
├── CLAUDE.md                   # primary agent context
├── .claude/
│   ├── context/                # reference pages (this folder)
│   └── skills/                 # agent skills
├── api/                        # Spring Boot backend
│   ├── pom.xml
│   └── src/main/java/com/example/api/{controller,service,model,config}
│   └── src/main/resources/{data/*.json, static/photos, application.properties}
│   └── src/test/java/...
└── ui/                         # React frontend
    ├── package.json, tsconfig.json, .eslintrc.js, pom.xml
    ├── public/{_redirects, index.html, photos/, documents/}
    ├── scripts/optimize-photos.js
    └── src/{App.tsx, pages/{photography,software}, components/, data/, utils/, styles/}
```
