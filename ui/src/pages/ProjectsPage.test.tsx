import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProjectsPage from './ProjectsPage';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
  );
};

describe('ProjectsPage', () => {
  test('renders main heading', () => {
    renderWithTheme(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /projects/i })).toBeInTheDocument();
  });

  test('displays featured projects section', () => {
    renderWithTheme(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 2, name: /featured projects/i })).toBeInTheDocument();
  });

  test('displays other projects section', () => {
    renderWithTheme(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 2, name: /other projects/i })).toBeInTheDocument();
  });

  test('shows personal website project', () => {
    renderWithTheme(<ProjectsPage />);
    expect(screen.getByText(/Personal Website/i)).toBeInTheDocument();
    expect(screen.getByText(/full-stack personal portfolio website/i)).toBeInTheDocument();
  });

  test('displays project technologies as chips', () => {
    renderWithTheme(<ProjectsPage />);
    const chips = document.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBeGreaterThan(0);

    // Check for some expected technologies
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  test('shows GitHub profile link', () => {
    renderWithTheme(<ProjectsPage />);
    expect(screen.getByText(/View GitHub Profile/i)).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: /View GitHub Profile/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Nhucanada');
  });

  test('renders project cards with proper structure', () => {
    renderWithTheme(<ProjectsPage />);
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBeGreaterThan(0);
  });

  test('displays code and demo buttons where applicable', () => {
    renderWithTheme(<ProjectsPage />);
    const codeButtons = screen.getAllByText(/code/i);
    const demoButtons = screen.getAllByText(/live demo/i);

    expect(codeButtons.length).toBeGreaterThan(0);
    expect(demoButtons.length).toBeGreaterThan(0);
  });

  test('has proper grid layout for projects', () => {
    renderWithTheme(<ProjectsPage />);
    const gridElements = document.querySelectorAll('.MuiGrid-root');
    expect(gridElements.length).toBeGreaterThan(0);
  });

  test('displays project descriptions', () => {
    renderWithTheme(<ProjectsPage />);
    expect(screen.getByText(/responsive design with Material-UI components/i)).toBeInTheDocument();
    expect(screen.getByText(/microservices architecture/i)).toBeInTheDocument();
  });
});
