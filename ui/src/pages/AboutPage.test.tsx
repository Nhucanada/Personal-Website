import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AboutPage from './AboutPage';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('AboutPage', () => {
  test('renders main heading', () => {
    renderWithTheme(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1, name: /about me/i })).toBeInTheDocument();
  });

  test('displays subtitle', () => {
    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/CS & AI Student at McGill University/i)).toBeInTheDocument();
  });

  test('shows avatar component', () => {
    renderWithTheme(<AboutPage />);
    const avatar = document.querySelector('.MuiAvatar-root');
    expect(avatar).toBeInTheDocument();
  });

  test('displays my story section', () => {
    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/My Story/i)).toBeInTheDocument();
    expect(screen.getByText(/Nathan Hu, currently pursuing Computer Science and AI/i)).toBeInTheDocument();
  });

  test('renders technical skills section', () => {
    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();

    // Check for some expected skills
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Jenkins')).toBeInTheDocument();
  });

  test('displays areas of interest', () => {
    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/Areas of Interest/i)).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
  });

  test('shows philosophy section', () => {
    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/Philosophy/i)).toBeInTheDocument();
    expect(screen.getByText(/always eager to learn new things and build impactful projects/i)).toBeInTheDocument();
  });

  test('has proper grid layout', () => {
    renderWithTheme(<AboutPage />);
    const gridElements = document.querySelectorAll('.MuiGrid-root');
    expect(gridElements.length).toBeGreaterThan(0);
  });

  test('skills are rendered as chips', () => {
    renderWithTheme(<AboutPage />);
    const chips = document.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBeGreaterThan(0);
  });
});