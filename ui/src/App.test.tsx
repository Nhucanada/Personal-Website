import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box
} from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import WorkExperiencePage from './pages/WorkExperiencePage';
import EducationPage from './pages/EducationPage';
import ContactPage from './pages/ContactPage';
import AIPage from './pages/AIPage';

// Mock useMediaQuery for consistent testing
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(() => false), // Default to desktop view
}));

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    h1: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h2: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h3: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h4: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h5: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h6: {
      fontWeight: 600,
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #333333',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333333',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
          color: '#ffffff',
        },
      },
    },
  },
});

const TestApp: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<WorkExperiencePage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TestApp />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(false); // Default to desktop
  });

  test('renders header with navigation', () => {
    renderWithRouter();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toHaveTextContent('Personal Website');
  });

  test('renders home page by default', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { level: 1, name: /nathan hu/i })).toBeInTheDocument();
    expect(screen.getByText(/CS & AI Student at McGill University/i)).toBeInTheDocument();
  });

  test('navigates to about page', () => {
    renderWithRouter(['/about']);
    expect(screen.getByRole('heading', { level: 1, name: /about me/i })).toBeInTheDocument();
    expect(screen.getByText(/CS & AI Student at McGill University/i)).toBeInTheDocument();
  });

  test('navigates to projects page', () => {
    renderWithRouter(['/projects']);
    expect(screen.getByRole('heading', { level: 1, name: /projects/i })).toBeInTheDocument();
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
  });

  test('navigates to experience page', () => {
    renderWithRouter(['/experience']);
    expect(screen.getByRole('heading', { level: 1, name: /work experience/i })).toBeInTheDocument();
  });

  test('navigates to education page', () => {
    renderWithRouter(['/education']);
    expect(screen.getByRole('heading', { level: 1, name: /education & certifications/i })).toBeInTheDocument();
  });

  test('navigates to AI page', () => {
    renderWithRouter(['/ai']);
    expect(screen.getByRole('heading', { level: 1, name: /ai development showcase/i })).toBeInTheDocument();
    expect(screen.getByText(/AI Contribution Statistics/i)).toBeInTheDocument();
  });

  test('navigates to contact page', () => {
    renderWithRouter(['/contact']);
    expect(screen.getByRole('heading', { level: 1, name: /contact me/i })).toBeInTheDocument();
    expect(screen.getByText(/Send a Message/i)).toBeInTheDocument();
  });

  test('applies material-ui theme', () => {
    renderWithRouter();
    expect(document.querySelector('.MuiAppBar-root')).toBeInTheDocument();
  });

  test('css baseline is applied', () => {
    renderWithRouter();
    expect(document.body).toHaveStyle('margin: 0');
  });

  test('app has proper layout structure', () => {
    renderWithRouter();

    // Check for main layout components
    const header = screen.getByTestId('header');
    const main = document.querySelector('main');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  test('theme configuration is applied', () => {
    renderWithRouter();

    // Check that custom theme styles are applied
    const buttons = document.querySelectorAll('.MuiButton-root');
    if (buttons.length > 0) {
      // Custom theme removes text transform
      expect(buttons[0]).toHaveStyle('text-transform: none');
    }
  });

  test('router provides navigation context', () => {
    renderWithRouter();

    // Navigation buttons should be present (desktop view) - no Home button, only home icon
    expect(screen.getByTestId('home-icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('nav-about')).toBeInTheDocument();
    expect(screen.getByTestId('nav-projects')).toBeInTheDocument();
    expect(screen.getByTestId('nav-experience')).toBeInTheDocument();
    expect(screen.getByTestId('nav-education')).toBeInTheDocument();
    expect(screen.getByTestId('nav-ai development')).toBeInTheDocument();
    expect(screen.getByTestId('nav-contact')).toBeInTheDocument();
  });

  test('app structure follows accessibility guidelines', () => {
    renderWithRouter();

    // Check for semantic HTML structure
    const header = screen.getByTestId('header');
    const main = document.querySelector('main');

    expect(header.tagName).toBe('HEADER');
    expect(main?.tagName).toBe('MAIN');
  });

  test('responsive layout is configured', () => {
    renderWithRouter();

    // Check for responsive container
    const container = document.querySelector('.MuiContainer-root');
    expect(container).toBeInTheDocument();
  });

  test('navigation works with click events', () => {
    renderWithRouter();

    // Click on About navigation
    const aboutButton = screen.getByTestId('nav-about');
    fireEvent.click(aboutButton);

    // Should navigate to about page
    expect(screen.getByRole('heading', { level: 1, name: /about me/i })).toBeInTheDocument();
  });

  test('mobile navigation is available', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(true); // Mobile view

    renderWithRouter();

    // Should show mobile menu button
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();

    // Click to open mobile menu
    fireEvent.click(screen.getByTestId('menu-button'));

    // Mobile navigation should be visible
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  test('handles unknown routes gracefully', () => {
    renderWithRouter(['/unknown-route']);

    // Should still render the app structure
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});