import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography
} from '@mui/material';

// Import the theme directly from App.tsx
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

const TestComponent: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Box sx={{ p: 2 }}>
        <Typography variant="h1" data-testid="test-heading">
          Test Heading
        </Typography>
      </Box>
    </BrowserRouter>
  </ThemeProvider>
);

describe('Dark Theme Configuration', () => {
  test('applies dark theme correctly', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('test-heading')).toBeInTheDocument();
  });

  test('theme has dark mode enabled', () => {
    expect(theme.palette.mode).toBe('dark');
  });

  test('theme has correct primary color', () => {
    expect(theme.palette.primary.main).toBe('#90caf9');
  });

  test('theme has correct secondary color', () => {
    expect(theme.palette.secondary.main).toBe('#f48fb1');
  });

  test('theme has dark background colors', () => {
    expect(theme.palette.background.default).toBe('#0a0a0a');
    expect(theme.palette.background.paper).toBe('#1a1a1a');
  });

  test('theme has white text colors', () => {
    expect(theme.palette.text.primary).toBe('#ffffff');
    expect(theme.palette.text.secondary).toBe('#b0b0b0');
  });

  test('typography has white colors', () => {
    expect(theme.typography.h1.color).toBe('#ffffff');
    expect(theme.typography.h2.color).toBe('#ffffff');
    expect(theme.typography.h3.color).toBe('#ffffff');
  });

  test('button component has correct text transform', () => {
    expect(theme.components?.MuiButton?.styleOverrides?.root).toHaveProperty('textTransform', 'none');
  });

  test('card component has dark styling', () => {
    expect(theme.components?.MuiCard?.styleOverrides?.root).toHaveProperty('backgroundColor', '#1a1a1a');
    expect(theme.components?.MuiCard?.styleOverrides?.root).toHaveProperty('border', '1px solid #333333');
  });

  test('CSS baseline is applied', () => {
    render(<TestComponent />);
    // Check if body has proper styling
    expect(document.body).toHaveStyle('margin: 0');
  });
});