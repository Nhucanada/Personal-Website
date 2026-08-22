# Nathan Hu - Personal Website

NOTE: This website isn't currently deployed while I wait for somewhere to host my backend, so you'll have to run it locally 

A full-stack personal portfolio website built with Maven, featuring a React TypeScript frontend with Material-UI and a Spring Boot backend API. This website showcases my experience as a Computer Science & AI student at McGill University, alongside my internship experience at PointClickCare, Intact, and 360insights.

## Project Structure

```
personal-website/
├── api/                 # Spring Boot backend API
│   ├── src/
│   │   ├── main/java/
│   │   ├── main/resources/
│   │   └── test/java/
│   └── pom.xml
├── ui/                  # React TypeScript frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── pom.xml
├── pom.xml             # Root Maven configuration
└── README.md
```

## Technology Stack

### Frontend (UI)
- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - React component library with a custom light theme (warm serif type)
- **React Router 6** - Client-side routing for the single-page application
- **sharp** - Build-time image optimizer that generates WebP derivatives for the gallery
- **ESLint** - Code quality and formatting enforcement with React and TypeScript rules
- **Emotion** - CSS-in-JS library for styling
- **Jest & React Testing Library** - Unit testing

### Backend (API)
- **Spring Boot 2.7** - Java framework for building REST APIs
- **Jackson ObjectMapper** - JSON data processing and profile data management
- **Profile API Architecture** - REST endpoints for experiences, education, projects, personal info, and skills
- **Maven** - Build automation and dependency management
- **JUnit & Mockito** - Unit testing framework
- **JaCoCo** - Code coverage analysis tool (96% instruction coverage)
- **Checkstyle** - Code quality and style enforcement
- **Maven Surefire** - Enhanced test reporting

## Prerequisites

- **Java 11+** - Required for Spring Boot backend
- **Node.js 18.14.0+** - Required for React frontend (specified in ui/pom.xml)
- **npm 9.0.0+** - Package manager for frontend dependencies
- **Maven 3.6+** - Build tool (or use Maven wrapper)

## Quick Start

### Option 1: Run Both Services Together

```bash
# Build and run the entire project
mvn clean install
mvn spring-boot:run -pl api

# In a separate terminal, start the frontend
cd ui
npm install
npm start
```

### Environment Configuration (separate frontend/backend deployments)

- Frontend API base URL is controlled by `REACT_APP_API_URL`
- Backend allowed frontend origins are controlled by `APP_CORS_ALLOWED_ORIGINS`
- Backend port is controlled by `SERVER_PORT`

Create local env files from examples:

```bash
cp ui/.env.example ui/.env.local
cp api/.env.example api/.env
```

Production example:

- Frontend: `REACT_APP_API_URL=https://api.yourdomain.com`
- Backend: `APP_CORS_ALLOWED_ORIGINS=https://www.yourdomain.com,https://yourdomain.com`

### Option 2: Run Services Separately

See individual README files in each module:
- [API Documentation](./api/README.md)
- [UI Documentation](./ui/README.md)

## Development

### Building the Project

```bash
# Build all modules
mvn clean install

# Build specific module
mvn clean install -pl api
mvn clean install -pl ui
```

### Running Tests

```bash
# Run all tests
mvn test

# Run API tests only
mvn test -pl api

# Run frontend tests
cd ui && npm test

# Generate code coverage report
mvn test jacoco:report -pl api

# Run code quality checks
mvn checkstyle:check -pl api

# Run ESLint on frontend
cd ui && npm run lint
```

## Deployment

The project is configured for easy deployment:

- **API**: Builds as a standalone JAR with embedded Tomcat server
- **UI**: Builds static assets that can be served by any web server

## Features

- **Landing selector** - A light-themed `/` entry point that branches into the photography and
  software sections (or an under-construction screen when the construction flag is enabled).
- **Photography portfolio** (`/photo`) - The fully built-out section: portfolio grid, category
  pages (Polaroids, Portraits, Studio), project galleries, and a full-screen image viewer.
- **Image optimization pipeline** - Build-time WebP generation via `sharp`, with a runtime
  helper that serves optimized gallery images while the viewer and selector use originals.
- **Software section** (`/dev`) - Currently a work-in-progress placeholder embedding a resume.
- **Spring Boot API** - JSON-backed profile/photography endpoints under `/api` (used by tooling
  and legacy pages; the live gallery reads static data in `ui/src/data/photography.ts`).
- **Responsive, class-based layouts** - Photography styles in `ui/src/styles/photography.css`.
- **Code quality** - ESLint on the frontend; JaCoCo/Checkstyle and JUnit tests on the backend.

## Working on this project with an AI agent

Agent context lives in [`CLAUDE.md`](./CLAUDE.md), with detailed reference pages in
`.claude/context/` and task skills in `.claude/skills/`. Read `CLAUDE.md` first — it documents
the live site shape (selector + photography + software placeholder), which legacy pages are no
longer routed, the build/test commands, and the image pipeline. Keep those files in sync with
the code (see the `sync-context` skill).

## Contact

- **Email**: nhucanada0628@gmail.com
- **McGill Email**: nathan.hu@mail.mcgill.ca
- **LinkedIn**: [linkedin.com/in/nhucanada](https://www.linkedin.com/in/nhucanada/)
- **GitHub**: [github.com/Nhucanada](https://github.com/Nhucanada)

## License

This project is licensed under the MIT License.
