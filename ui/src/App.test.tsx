import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders personal website title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Personal Website/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders welcome message', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/Welcome to my Personal Website/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  test('renders description text', () => {
    render(<App />);
    const descriptionElement = screen.getByText(/This is a modern website built with React and Material-UI/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders get started button', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /get started/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('get started button is clickable', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /get started/i });

    // Verify button can be clicked
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });

  test('app bar contains home icon', () => {
    render(<App />);
    // Check for the presence of the home icon (MUI icon)
    const homeIcon = document.querySelector('[data-testid="HomeIcon"]');
    expect(homeIcon).toBeInTheDocument();
  });

  test('content is wrapped in container', () => {
    render(<App />);
    // Check that main content exists within the container structure
    const welcomeHeading = screen.getByRole('heading', { name: /Welcome to my Personal Website/i });
    expect(welcomeHeading).toBeInTheDocument();
  });

  test('applies material-ui theme', () => {
    render(<App />);
    // Check that ThemeProvider is working by verifying styled components render
    const appBar = document.querySelector('.MuiAppBar-root');
    expect(appBar).toBeInTheDocument();
  });

  test('paper component has elevation', () => {
    render(<App />);
    // Check for Material-UI Paper component with elevation
    const paperElement = document.querySelector('.MuiPaper-elevation3');
    expect(paperElement).toBeInTheDocument();
  });

  test('typography components use correct variants', () => {
    render(<App />);
    // Check for h1 heading (variant="h2" maps to h1 element with h2 styling)
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Welcome to my Personal Website');
  });

  test('button has correct variant and size', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /get started/i });

    // Material-UI adds specific classes for variant and size
    expect(buttonElement).toHaveClass('MuiButton-contained');
    expect(buttonElement).toHaveClass('MuiButton-sizeLarge');
  });

  test('css baseline is applied', () => {
    render(<App />);
    // CssBaseline should normalize default styles
    // We can check that the body element has been styled
    expect(document.body).toHaveStyle('margin: 0');
  });

  test('responsive container max width', () => {
    render(<App />);
    // Check for Material-UI Container component
    const containerElement = document.querySelector('.MuiContainer-maxWidthLg');
    expect(containerElement).toBeInTheDocument();
  });

  test('app structure follows material design patterns', () => {
    render(<App />);

    // Check for key Material-UI components
    expect(document.querySelector('.MuiAppBar-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiToolbar-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiContainer-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiPaper-root')).toBeInTheDocument();
    expect(document.querySelector('.MuiButton-root')).toBeInTheDocument();
  });

  test('accessibility: proper heading hierarchy', () => {
    render(<App />);

    // Check heading hierarchy
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent('Welcome to my Personal Website');
  });

  test('accessibility: button has accessible name', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /get started/i });
    expect(buttonElement).toHaveAccessibleName('Get Started');
  });
});