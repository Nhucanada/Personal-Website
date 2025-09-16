# UI - Nathan Hu's Portfolio Frontend

React TypeScript frontend with Material-UI for Nathan Hu's personal portfolio website.

## Description

This module contains the frontend user interface for Nathan Hu's personal portfolio, built with React, TypeScript, and Material-UI. It showcases Nathan's experience as a CS & AI student at McGill University, featuring his internship experience at PointClickCare, Intact, and 360insights.

## Technology Stack

- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript superset
- **Material-UI (MUI) 5** - React component library with custom dark theme implementation
- **Dark Theme** - Professional dark color scheme with accessibility considerations
- **Emotion** - CSS-in-JS library for styling
- **React Scripts** - Build tooling and development server

## Project Structure

```
ui/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Application entry point
│   └── ...                # Additional components (as you add them)
├── package.json           # Node.js dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── pom.xml               # Maven integration for build pipeline
└── README.md
```

## Prerequisites

- **Node.js 18.14.0+** and **npm 9.0.0+** (specified in pom.xml and package.json)
- **TypeScript** knowledge recommended

## Getting Started

### 1. Navigate to UI Directory

```bash
cd ui
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Start Development Server

```bash
# Using npm
npm start

# Or using yarn
yarn start
```

The application will open in your browser at `http://localhost:3000`

### 4. Verify the Application

- The website should display with Material-UI styling
- Check browser console for any errors
- Hot reload should work when you make changes

## Available Scripts

### Development

```bash
npm start          # Start development server with hot reload
npm test           # Run tests in watch mode
npm run build      # Build for production
npm run eject      # Eject from Create React App (not recommended)
```

### Testing

The UI includes comprehensive unit and integration tests using React Testing Library and Jest, with 171 total tests achieving 94.29% statement coverage.

#### Test Structure

```
src/
├── App.test.tsx                    # Main app component tests
├── Theme.test.tsx                  # Dark theme configuration tests
├── setupTests.ts                   # Test configuration and mocks
├── components/
│   ├── Header.test.tsx             # Header component tests
│   └── WelcomeCard.test.tsx        # Welcome card component tests
├── pages/
│   ├── HomePage.test.tsx           # Homepage dashboard tests
│   ├── AboutPage.test.tsx          # About page tests
│   ├── ProjectsPage.test.tsx       # Projects showcase tests
│   ├── WorkExperiencePage.test.tsx # Interactive timeline tests (244 lines)
│   ├── EducationPage.test.tsx      # Education timeline tests
│   ├── ContactPage.test.tsx        # Contact form tests
│   └── AIPage.test.tsx             # AI contributions showcase tests
├── utils/
│   └── api.test.ts                 # API utility tests
└── __tests__/
    └── integration.test.tsx        # Integration tests
```

#### Running Tests

```bash
# Run all tests in watch mode (default)
npm test

# Run tests once (CI mode)
npm test -- --watchAll=false

# Run tests with coverage report
npm test -- --coverage --watchAll=false

# Run specific test file
npm test -- App.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders"

# Update test snapshots
npm test -- --updateSnapshot

# Run tests in debug mode
npm test -- --verbose

# Run tests with specific environment
CI=true npm test
```

#### Test Categories

**Unit Tests:**
- **Component Tests**: Test individual React components in isolation
- **Utility Tests**: Test helper functions and API utilities
- **Hook Tests**: Test custom React hooks (when added)

**Integration Tests:**
- **App Integration**: Test complete app structure and Material-UI theme
- **User Interaction**: Test user workflows and component interactions
- **API Integration**: Mock API calls and test data flow

#### Test Coverage

Current test coverage includes:
- ✅ **App Component**: Routing and navigation testing with MemoryRouter
- ✅ **Header Component**: Responsive navigation with desktop/mobile views
- ✅ **WelcomeCard Component**: Full functionality and accessibility testing
- ✅ **Page Components**: Individual tests for all 7 pages (Home, About, Projects, Experience, Education, AI, Contact)
- ✅ **API Utilities**: Comprehensive mocking and error handling
- ✅ **Integration Tests**: Full app rendering and Material-UI integration
- ✅ **Navigation Testing**: Route changes and menu interactions

#### Viewing Test Results

```bash
# Generate coverage report
npm test -- --coverage --watchAll=false

# View coverage in browser (after running coverage)
open coverage/lcov-report/index.html  # macOS
xdg-open coverage/lcov-report/index.html  # Linux
```

#### Testing Best Practices

**Component Testing:**
- Use `render()` from React Testing Library
- Test user interactions with `fireEvent` or `userEvent`
- Assert using semantic queries (`getByRole`, `getByText`)
- Test accessibility with ARIA attributes

**Material-UI Testing:**
- Wrap components with `ThemeProvider` for testing
- Test Material-UI class names for styling verification
- Use `data-testid` attributes for reliable element selection

**API Testing:**
- Mock `fetch` globally in `setupTests.ts`
- Test success and error scenarios
- Verify correct API call parameters
- Test error handling and loading states

#### Test Configuration

**Jest Configuration:**
- `setupTests.ts` configures testing environment
- Mocks browser APIs not available in Node.js
- Global fetch mocking for API tests

**React Testing Library Setup:**
- `@testing-library/jest-dom` for additional matchers
- `@testing-library/react` for component testing
- `@testing-library/user-event` for user interactions

#### Debugging Tests

```bash
# Run tests with Node debugger
npm test -- --inspect-brk

# Add console.log in tests for debugging
console.log(screen.debug()); // Print component HTML

# Use VS Code debugging
# Add breakpoints and run "Debug Jest Tests" configuration
```

## Development

### Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Header.tsx          # Navigation header with responsive menu
│   ├── Header.test.tsx     # Header component tests
│   ├── WelcomeCard.tsx     # Home page welcome card
│   └── WelcomeCard.test.tsx # Welcome card tests
├── pages/                   # Page components for routing
│   ├── HomePage.tsx        # Landing page with welcome content
│   ├── AboutPage.tsx       # About me page with skills and story
│   ├── ProjectsPage.tsx    # Projects showcase with links
│   ├── WorkExperiencePage.tsx # Professional experience timeline
│   ├── EducationPage.tsx   # Education and certifications
│   ├── AIPage.tsx          # AI contribution showcase and tracking
│   ├── ContactPage.tsx     # Contact form and information
│   └── *.test.tsx          # Page component tests
├── utils/                   # Utility functions
│   ├── api.ts              # API client functions
│   └── api.test.ts         # API utility tests
├── __tests__/              # Integration tests
│   └── integration.test.tsx # App-wide integration tests
├── App.tsx                 # Main app with routing configuration
├── App.test.tsx            # App component tests
├── index.tsx               # Application entry point
└── setupTests.ts           # Test environment setup
```

### Project Configuration

- **TypeScript**: Configured in `tsconfig.json`
- **Material-UI Dark Theme**: Comprehensive dark theme configuration in `App.tsx` including:
  - Dark mode palette with primary (#90caf9) and secondary (#f48fb1) colors
  - Dark background colors (#0a0a0a for default, #1a1a1a for paper)
  - White typography colors for all heading levels
  - Component style overrides for Cards, Paper, AppBar, and Chips
- **React Router**: Configured for client-side navigation between pages
- **Build Settings**: Managed by React Scripts

### Adding New Components

1. Create component files in `src/components/` (create this directory as needed)
2. Use TypeScript for type safety
3. Follow Material-UI patterns for consistent styling

Example component:

```typescript
// src/components/MyComponent.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
};

export default MyComponent;
```

### Styling with Material-UI

Use the `sx` prop for styling:

```typescript
<Box
  sx={{
    p: 2,           // padding: 16px
    m: 1,           // margin: 8px
    bgcolor: 'primary.main',
    color: 'white'
  }}
>
  Content
</Box>
```

### Navigation and Routing

The application uses React Router for client-side navigation:

```typescript
// Navigation structure in App.tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/experience" element={<WorkExperiencePage />} />
  <Route path="/education" element={<EducationPage />} />
  <Route path="/contact" element={<ContactPage />} />
</Routes>
```

**Available Pages:**
- **Home** (`/`) - Dashboard featuring widget previews of all sections with prominent AI development showcase
- **About** (`/about`) - Nathan's background, technical skills (Java, Python, React, TypeScript, Jenkins), and philosophy
- **Projects** (`/projects`) - Portfolio showcasing GitHub projects including Personal Website, Java Search Engine, and Guardians of the Hive
- **Experience** (`/experience`) - Professional timeline including internships at PointClickCare, Intact, and 360insights
- **Education** (`/education`) - McGill University Software Engineering degree and certifications
- **AI Development** (`/ai`) - Comprehensive showcase of AI contributions, featuring statistics, methodology, and problem-solving examples
- **Contact** (`/contact`) - Professional contact information and LinkedIn/GitHub profiles

**Navigation Features:**
- Responsive design with desktop menu and mobile drawer
- Active page highlighting
- Keyboard navigation support
- Accessible ARIA labels and semantic HTML

### Connecting to API

The application includes API utilities for backend integration:

```typescript
// Using the API client from utils/api.ts
import { greetingApi, healthApi } from './utils/api';

// Get greeting from backend
const greeting = await greetingApi.getGreeting('John');

// Check API health
const health = await healthApi.getHealth();
```

**API Configuration:**
- Base URL configured via `REACT_APP_API_URL` environment variable
- Error handling and loading states included
- TypeScript interfaces for type safety

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates optimized files in the `build/` directory:
- Minified JavaScript and CSS
- Optimized images
- Service worker for caching (optional)

### Serve Production Build Locally

```bash
# Install serve globally if not already installed
npm install -g serve

# Serve the build directory
serve -s build -l 3000
```

## Environment Configuration

Create `.env` files for different environments:

```bash
# .env.development
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENV=development

# .env.production
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_ENV=production
```

## Maven Integration

The UI module is integrated with Maven through the frontend-maven-plugin:

```bash
# Build with Maven (from root directory)
mvn clean install -pl ui

# This will:
# 1. Install Node.js and npm
# 2. Run npm install
# 3. Run npm run build
```

## Deployment

### Static File Hosting

The built files can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `build/` folder
- **Vercel**: Connect your Git repository
- **AWS S3**: Upload `build/` contents to S3 bucket
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Docker Deployment

```dockerfile
# Multi-stage Dockerfile example
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**:
   ```bash
   # Use different port
   PORT=3001 npm start
   ```

2. **Node modules issues**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**:
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

4. **Build fails**:
   ```bash
   # Clear cache and rebuild
   npm run build -- --no-cache
   ```

### Performance Tips

- Use React.memo() for expensive components
- Implement code splitting with React.lazy()
- Optimize bundle size with webpack-bundle-analyzer
- Use Material-UI's tree shaking for smaller builds

## Browser Support

This project supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

For older browser support, you may need to add polyfills.