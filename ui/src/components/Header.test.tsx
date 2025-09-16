import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Mock useMediaQuery for consistent testing
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(() => false), // Default to desktop view
}));

describe('Header Component', () => {
  beforeEach(() => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(false); // Default to desktop
  });

  test('renders with default title', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Personal Website');
  });

  test('renders with custom title', () => {
    const customTitle = 'My Custom Website';
    renderWithProviders(<Header title={customTitle} />);
    expect(screen.getByTestId('header-title')).toHaveTextContent(customTitle);
  });

  test('renders home icon button', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('home-icon-button')).toBeInTheDocument();
  });

  test('displays desktop navigation on large screens', () => {
    renderWithProviders(<Header />);

    // Check for navigation buttons (no Home button - only home icon)
    expect(screen.getByTestId('nav-about')).toBeInTheDocument();
    expect(screen.getByTestId('nav-projects')).toBeInTheDocument();
    expect(screen.getByTestId('nav-experience')).toBeInTheDocument();
    expect(screen.getByTestId('nav-education')).toBeInTheDocument();
    expect(screen.getByTestId('nav-ai development')).toBeInTheDocument();
    expect(screen.getByTestId('nav-contact')).toBeInTheDocument();
  });

  test('shows mobile menu button on small screens', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(true); // Mobile view

    renderWithProviders(<Header />);
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
  });

  test('opens mobile drawer when menu button is clicked', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(true); // Mobile view

    renderWithProviders(<Header />);

    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  test('navigation items have correct icons and labels', () => {
    renderWithProviders(<Header />);

    expect(screen.getByTestId('nav-about')).toHaveTextContent('About');
    expect(screen.getByTestId('nav-projects')).toHaveTextContent('Projects');
    expect(screen.getByTestId('nav-experience')).toHaveTextContent('Experience');
    expect(screen.getByTestId('nav-education')).toHaveTextContent('Education');
    expect(screen.getByTestId('nav-ai development')).toHaveTextContent('AI Development');
    expect(screen.getByTestId('nav-contact')).toHaveTextContent('Contact');
  });

  test('header has correct test id', () => {
    renderWithProviders(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('applies correct Material-UI classes', () => {
    renderWithProviders(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('MuiAppBar-root');
  });

  test('toolbar is present', () => {
    renderWithProviders(<Header />);
    const toolbar = document.querySelector('.MuiToolbar-root');
    expect(toolbar).toBeInTheDocument();
  });

  test('title typography has correct variant', () => {
    renderWithProviders(<Header />);
    const title = screen.getByTestId('header-title');
    expect(title).toHaveClass('MuiTypography-h6');
  });

  test('header is positioned static', () => {
    renderWithProviders(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('MuiAppBar-positionStatic');
  });

  test('title is clickable and navigates to home', () => {
    renderWithProviders(<Header />);
    const title = screen.getByTestId('header-title');
    expect(title).toHaveStyle('cursor: pointer');
  });

  test('mobile navigation contains all menu items', () => {
    const { useMediaQuery } = require('@mui/material');
    useMediaQuery.mockReturnValue(true); // Mobile view

    renderWithProviders(<Header />);

    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);

    // Check mobile navigation items (no home - only home icon)
    expect(screen.getByTestId('mobile-nav-about')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-projects')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-experience')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-education')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-ai development')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-contact')).toBeInTheDocument();
  });
});