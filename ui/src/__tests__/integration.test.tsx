import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import * as useProfileData from '../hooks/useProfileData';

// Mock useMediaQuery for consistent testing
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(() => false), // Default to desktop view
}));

// Integration tests for the entire app
describe('App Integration Tests', () => {
  beforeEach(() => {
    // Mock profile data hooks with loading state
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });
    jest.spyOn(useProfileData, 'useExperiences').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });
    jest.spyOn(useProfileData, 'useEducation').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });
  });

  test('renders complete application structure', () => {
    render(<App />);

    // Check that all major components are rendered
    expect(screen.getByTestId('header-title')).toHaveTextContent('Personal Website');
    expect(screen.getByRole('heading', { level: 1, name: /nathan hu/i })).toBeInTheDocument();
    expect(screen.getByText(/CS & AI Student at McGill University/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Development Showcase/i)).toBeInTheDocument();
  });

  test('Material-UI theme is properly applied throughout the app', () => {
    render(<App />);

    // Check for Material-UI component classes
    expect(document.querySelector('.MuiAppBar-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiContainer-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiPaper-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiButton-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiTypography-root')).toBeInTheDocument();
  });

  test('responsive layout components are present', () => {
    render(<App />);

    // Check for responsive container (HomePage uses maxWidthXl)
    expect(document.querySelector('.MuiContainer-maxWidthXl')).toBeInTheDocument();

    // Check for proper spacing using Box component
    const boxElements = document.querySelectorAll('.MuiBox-root');
    expect(boxElements.length).toBeGreaterThan(0);
  });

  test('accessibility features are implemented', () => {
    render(<App />);

    // Check for proper heading structure
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    // Check for proper button accessibility - use an actual button from HomePage
    const button = screen.getByRole('button', { name: /explore ai development/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test('CSS baseline normalization is applied', () => {
    render(<App />);

    // CssBaseline should normalize margin on body
    expect(document.body).toHaveStyle('margin: 0');
  });

  test('app structure follows Material Design principles', () => {
    render(<App />);

    // Check for proper Material Design component hierarchy
    const appBar = document.querySelector('.MuiAppBar-root');
    const toolbar = document.querySelector('.MuiToolbar-root');
    const container = document.querySelector('.MuiContainer-root');
    const paper = document.querySelector('.MuiPaper-root');

    expect(appBar).toBeInTheDocument();
    expect(toolbar).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(paper).toBeInTheDocument();

    // Verify toolbar is inside app bar
    if (appBar && toolbar) {
      expect(appBar).toContainElement(toolbar as HTMLElement);
    }
  });

  test('theme provider wraps entire application', () => {
    render(<App />);

    // Check that theme-dependent styling is applied
    // Material-UI components should have theme-based classes
    const styledComponents = document.querySelectorAll('[class*="Mui"]');
    expect(styledComponents.length).toBeGreaterThan(0);
  });

  test('color palette is consistently applied', () => {
    render(<App />);

    // Check for primary color application on button
    const button = screen.getByRole('button', { name: /explore ai development/i });
    expect(button).toHaveClass('MuiButton-contained');

    // Check that buttons have proper Material-UI styling
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(btn => {
      expect(btn.className).toMatch(/MuiButton/);
    });
  });

  test('elevation system is properly implemented', () => {
    render(<App />);

    // Check for paper elevation
    const paper = document.querySelector('.MuiPaper-elevation3');
    expect(paper).toBeInTheDocument();
  });

  test('spacing system is consistently used', () => {
    render(<App />);

    // Check that Box components with spacing are present
    // Material-UI uses spacing system for consistent layouts
    const spacedElements = document.querySelectorAll('[class*="MuiBox-root"]');
    expect(spacedElements.length).toBeGreaterThan(0);
  });
});
