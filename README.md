# Nathan Hu - Personal Website

A full-stack personal portfolio website built with Maven, featuring a React TypeScript frontend with Material-UI and a Spring Boot backend API. This website showcases Nathan Hu's experience as a Computer Science & AI student at McGill University with internship experience at PointClickCare, Intact, and 360insights.

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
- **React Router** - Client-side routing for single-page application
- **Emotion** - CSS-in-JS library for styling
- **Jest & React Testing Library** - Comprehensive unit testing

### Backend (API)
- **Spring Boot 2.7** - Java framework for building REST APIs
- **Maven** - Build automation and dependency management
- **JUnit & Mockito** - Unit testing framework

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

## Features

- **About Me** - Information about Nathan's background, skills, and interests
- **Projects** - Showcase of personal and academic projects with GitHub links
- **Work Experience** - Professional internship experience and leadership roles
- **Education** - Academic background at McGill University and certifications
- **AI Development** - Comprehensive showcase of AI contributions to this project
- **Contact** - Professional contact information and social media links
- **Responsive Design** - Mobile-friendly interface with Material-UI components
- **Interactive Navigation** - Smooth routing between pages
- **AI Contribution Tracking** - Detailed methodology for tracking AI vs human contributions

## Contact

- **Email**: nhucanada0628@gmail.com
- **McGill Email**: nathan.hu@mail.mcgill.ca
- **LinkedIn**: [linkedin.com/in/nhucanada](https://www.linkedin.com/in/nhucanada/)
- **GitHub**: [github.com/Nhucanada](https://github.com/Nhucanada)

## License

This project is licensed under the MIT License.