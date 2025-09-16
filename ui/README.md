# UI - Frontend Application

React TypeScript frontend with Material-UI for the personal website.

## Description

This module contains the frontend user interface built with React, TypeScript, and Material-UI. It provides a modern, responsive web interface that communicates with the backend API.

## Technology Stack

- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript superset
- **Material-UI (MUI) 5** - React component library implementing Material Design
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

- **Node.js 16+** and **npm** (or **yarn**)
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

The UI includes comprehensive unit and integration tests using React Testing Library and Jest.

#### Test Structure

```
src/
├── App.test.tsx                    # Main app component tests
├── setupTests.ts                   # Test configuration and mocks
├── components/
│   ├── Header.test.tsx             # Header component tests
│   └── WelcomeCard.test.tsx        # Welcome card component tests
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
- ✅ **App Component**: 100% line and branch coverage
- ✅ **Header Component**: Complete props and interaction testing
- ✅ **WelcomeCard Component**: Full functionality and accessibility testing
- ✅ **API Utilities**: Comprehensive mocking and error handling
- ✅ **Integration Tests**: Full app rendering and Material-UI integration

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

### Project Configuration

- **TypeScript**: Configured in `tsconfig.json`
- **Material-UI Theme**: Customized in `App.tsx`
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

### Connecting to API

When your backend is ready, update API calls:

```typescript
// Example API integration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/data`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

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

## Contributing

1. Follow React and TypeScript best practices
2. Use Material-UI components consistently
3. Write unit tests for new components
4. Ensure accessibility standards are met
5. Test on multiple browsers and devices

## Browser Support

This project supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

For older browser support, you may need to add polyfills.