# API - Backend Service

Spring Boot REST API backend for the personal website.

## Description

This module provides the backend API services for the personal website. It's built with Spring Boot and provides RESTful endpoints for the frontend application.

## Technology Stack

- **Spring Boot 2.7** - Main framework
- **Spring Web** - For REST API endpoints
- **Maven** - Build and dependency management
- **Java 11+** - Programming language
- **JaCoCo 0.8.8** - Code coverage analysis (96% instruction coverage)
- **Checkstyle 3.2.0** - Code quality and style enforcement
- **Maven Surefire 3.0.0-M9** - Enhanced test reporting
- **JUnit 5** - Testing framework with comprehensive coverage

## Project Structure

```
api/
├── src/
│   ├── main/
│   │   ├── java/           # Java source files
│   │   └── resources/      # Configuration files
│   └── test/
│       └── java/           # Test files
├── pom.xml                 # Maven dependencies and build configuration
└── README.md
```

## Prerequisites

- **Java 11 or higher**
- **Maven 3.6+** (or use Maven wrapper)

## Getting Started

### 1. Navigate to API Directory

```bash
cd api
```

### 2. Build the Application

```bash
# Using Maven
mvn clean compile

# Or from root directory
mvn clean compile -pl api
```

### 3. Run the Application

```bash
# Using Maven
mvn spring-boot:run

# Or run the JAR file after building
mvn clean package
java -jar target/api-1.0.0.jar
```

### 4. Verify the Application

The API server will start on `http://localhost:8080`

You can test the API by visiting:
- Health check: `http://localhost:8080/actuator/health` (if actuator is configured)
- API endpoints: `http://localhost:8080/api/...` (define your endpoints)

## Development

### Running Tests

The API includes comprehensive unit and integration tests using Spring Boot Test framework.

#### Test Structure

```
src/test/java/
├── com/example/api/
│   ├── ApplicationTests.java              # Context loading test
│   ├── controller/
│   │   ├── HealthControllerTest.java      # Health endpoint tests
│   │   └── GreetingControllerTest.java    # Greeting endpoint tests
│   ├── service/
│   │   └── GreetingServiceTest.java       # Service layer tests
│   └── integration/
│       └── IntegrationTestSuite.java      # End-to-end tests
```

#### Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=GreetingServiceTest

# Run tests with detailed output
mvn test -Dtest.verbose=true

# Run tests with coverage report
mvn test jacoco:report

# Run code quality checks
mvn checkstyle:check

# Run tests with coverage and quality checks
mvn clean test jacoco:report checkstyle:check

# Run only unit tests (exclude integration tests)
mvn test -Dtest=!**/*IntegrationTest*

# Run only integration tests
mvn test -Dtest=**/*IntegrationTest*
```

#### Test Categories

**Unit Tests:**
- **Controller Tests** (`@WebMvcTest`): Test REST endpoints with mocked dependencies
- **Service Tests** (`@SpringBootTest`): Test business logic with real Spring context
- **Component Tests**: Test individual components in isolation

**Integration Tests:**
- **Full Context Tests** (`@SpringBootTest`): Test complete application with real HTTP server
- **API Integration**: End-to-end testing of REST endpoints
- **Database Integration**: Test data persistence layers (when added)

#### Test Coverage & Quality Metrics

**JaCoCo Coverage Analysis:**
- ✅ **Overall Coverage**: 96% instruction coverage, 95% branch coverage
- ✅ **HealthController**: 100% method coverage
- ✅ **GreetingController**: 100% method coverage
- ✅ **GreetingService**: 100% method coverage
- ✅ **Application**: Partially covered (main method excluded)

**Checkstyle Quality Checks:**
- ✅ **Code Style**: Enforced naming conventions and formatting
- ✅ **Import Organization**: No unused imports, no star imports
- ✅ **Javadoc Requirements**: Public methods documented
- ✅ **Line Length**: Maximum 120 characters enforced
- ⚠️ **Minor Issues**: Newline at end of file warnings (non-blocking)

**Coverage Reports:**
- HTML Report: `target/site/jacoco/index.html`
- XML Report: `target/site/jacoco/jacoco.xml`
- Checkstyle Report: `target/checkstyle-result.xml`

#### Viewing Test Results

```bash
# Generate and view coverage report
mvn clean test jacoco:report
open target/site/jacoco/index.html  # macOS
xdg-open target/site/jacoco/index.html  # Linux
```

#### Mock Testing

Tests use Mockito for mocking dependencies:
- `@MockBean` for Spring context integration
- `@Mock` for unit testing
- `MockMvc` for web layer testing

#### Test Configuration

- **Test Profiles**: Tests run with `test` profile
- **Test Database**: H2 in-memory database (when persistence is added)
- **Test Properties**: Configure via `application-test.properties`

### Building for Production

```bash
# Create production JAR
mvn clean package

# The JAR file will be created in target/api-1.0.0.jar
```

### Configuration

Application configuration can be found in:
- `src/main/resources/application.properties` - Main configuration
- `src/main/resources/application-dev.properties` - Development profile
- `src/main/resources/application-prod.properties` - Production profile

### Common Development Tasks

```bash
# Clean and rebuild
mvn clean compile

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Debug mode
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005"
```

## API Endpoints

### Health and Status

```
GET    /api/health          - Health check endpoint
GET    /api/status          - Application status and version
```

**Example Response - Health:**
```json
{
  "status": "UP",
  "service": "Personal Website API"
}
```

**Example Response - Status:**
```json
{
  "status": "RUNNING",
  "timestamp": 1640995200000,
  "version": "1.0.0"
}
```

### Greeting Service

```
GET    /api/greeting                    - Get default greeting
GET    /api/greeting?name={name}        - Get personalized greeting
POST   /api/greeting                    - Post greeting with JSON body
```

**Example Requests:**

```bash
# Default greeting
curl http://localhost:8080/api/greeting

# Personalized greeting
curl "http://localhost:8080/api/greeting?name=John"

# POST greeting
curl -X POST http://localhost:8080/api/greeting \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice"}'
```

**Example Responses:**

```json
{
  "message": "Hello, John! Welcome to my personal website."
}
```

**Error Response:**
```json
{
  "error": "Invalid name provided"
}
```

## Environment Variables

The following environment variables can be used to configure the application:

| Variable | Description | Default |
|----------|-------------|---------|
| `SERVER_PORT` | Server port | `8080` |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `dev` |

## Deployment

### Local Deployment

```bash
mvn clean package
java -jar target/api-1.0.0.jar
```

### Docker Deployment

```dockerfile
# Example Dockerfile (create as needed)
FROM openjdk:11-jre-slim
COPY target/api-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `application.properties`
   ```properties
   server.port=8081
   ```

2. **Java version issues**: Ensure Java 11+ is installed
   ```bash
   java -version
   ```

3. **Maven build fails**: Clean the project and rebuild
   ```bash
   mvn clean install
   ```

