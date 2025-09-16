# Personal Website

A full-stack web application built with Maven, featuring a React TypeScript frontend with Material-UI and a Spring Boot backend API.

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
- **Material-UI (MUI)** - React component library implementing Google's Material Design
- **Emotion** - CSS-in-JS library for styling

### Backend (API)
- **Spring Boot 2.7** - Java framework for building REST APIs
- **Maven** - Build automation and dependency management

## Prerequisites

- **Java 11+** - Required for Spring Boot backend
- **Node.js 16+** - Required for React frontend
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
```

## Deployment

The project is configured for easy deployment:

- **API**: Builds as a standalone JAR with embedded Tomcat server
- **UI**: Builds static assets that can be served by any web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

This project is licensed under the MIT License.