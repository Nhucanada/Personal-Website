# Backend (Spring Boot API)

Package root: `com.example.api`. Entry: `Application.java` (`@SpringBootApplication`).

## Layout

- `controller/` — `HealthController`, `GreetingController`, `ProfileController`.
- `service/` — `GreetingService`, `ProfileService` (loads JSON via Jackson `ObjectMapper`).
- `model/` — `Experience`, `Education`, `Project`, `PersonalInfo`, `Skills`, `PhotographyPhoto`.
- `config/` — `WebConfig` (CORS).
- `resources/data/*.json` — the profile/photography data source.
- `resources/static/photos/` — placeholder images served statically.
- `resources/application.properties` — `server.port` and `app.cors.allowed-origins`, both env-driven.

## Configuration

`application.properties`:

```
server.port=${SERVER_PORT:8080}
app.cors.allowed-origins=${APP_CORS_ALLOWED_ORIGINS:http://localhost:3000}
```

`WebConfig` applies CORS to `/api/**` for the comma-separated origins in
`app.cors.allowed-origins`, methods GET/POST/PUT/PATCH/DELETE/OPTIONS.

## Endpoints

Health/greeting:

- `GET /api/health`, `GET /api/status`
- greeting endpoints via `GreetingController`

Profile (`ProfileController`, base `/api/profile`):

- `GET /experiences`, `GET /experiences/{id}`
- `GET /education`, `GET /education/{id}`
- `GET /projects`, `GET /projects/featured`, `GET /projects/{id}`
- `GET /info` (personal info)
- `GET /skills`, `GET /skills/list`
- `GET /photos`, `GET /photos/featured`, `GET /photos/{id}`

All return `ResponseEntity`; `IOException` while loading JSON → 500, missing id → 404.

## Data files

`resources/data/`: `experiences.json`, `education.json`, `projects.json`,
`personal-info.json`, `skills.json`, `photography-photos.json`.

Note the hyphenated filenames (`personal-info.json`, `photography-photos.json`) — older docs
referenced `personal_info.json`, which does not exist.

## Tests

`src/test/java/com/example/api/`:

- `ApplicationTests.java` (context load)
- `controller/` — `HealthControllerTest`, `GreetingControllerTest`, `ProfileControllerTest`
- `service/` — `GreetingServiceTest`, `ProfileServiceTest`
- `model/PhotographyPhotoTest`
- `integration/` — `ProfileIntegrationTest`, `IntegrationTestSuite`

Run: `mvn test -pl api`.

## Relationship to the frontend

The live frontend does not call this API at runtime. The old dashboard pages that consumed the
profile endpoints (via `useProfileData` / `utils/api`) were removed, and the photography gallery
reads static data from `ui/src/data/photography.ts`. The API and its endpoints still build and
pass their tests, but nothing in the shipped UI depends on them today. Do not assume changing
`photography-photos.json` (or any profile JSON) affects the live UI.
