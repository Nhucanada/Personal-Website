import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from './HomePage';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('HomePage', () => {
  test('renders without crashing', () => {
    renderWithTheme(<HomePage />);
    expect(screen.getByTestId('welcome-card')).toBeInTheDocument();
  });

  test('displays welcome card component with correct content', () => {
    renderWithTheme(<HomePage />);
    expect(screen.getByTestId('welcome-title')).toBeInTheDocument();
    expect(screen.getByText('Nathan Hu')).toBeInTheDocument();
    expect(screen.getByText('CS & AI Student at McGill University | Software Engineering Intern')).toBeInTheDocument();
    expect(screen.getByText('View My Work')).toBeInTheDocument();
  });

  test('has proper container structure', () => {
    renderWithTheme(<HomePage />);
    const container = document.querySelector('.MuiContainer-maxWidthLg');
    expect(container).toBeInTheDocument();
  });

  test('applies correct spacing', () => {
    renderWithTheme(<HomePage />);
    const boxElement = document.querySelector('.MuiBox-root');
    expect(boxElement).toBeInTheDocument();
  });
});