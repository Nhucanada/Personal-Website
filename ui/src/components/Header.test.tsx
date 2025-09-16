import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  test('renders with default title', () => {
    renderWithTheme(<Header />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Personal Website');
  });

  test('renders with custom title', () => {
    const customTitle = 'My Custom Website';
    renderWithTheme(<Header title={customTitle} />);
    expect(screen.getByTestId('header-title')).toHaveTextContent(customTitle);
  });

  test('renders home icon', () => {
    renderWithTheme(<Header />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  test('does not show menu button by default', () => {
    renderWithTheme(<Header />);
    expect(screen.queryByTestId('menu-button')).not.toBeInTheDocument();
  });

  test('shows menu button when showMenuButton is true', () => {
    renderWithTheme(<Header showMenuButton={true} />);
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
  });

  test('calls onMenuClick when menu button is clicked', () => {
    const mockOnMenuClick = jest.fn();
    renderWithTheme(<Header showMenuButton={true} onMenuClick={mockOnMenuClick} />);

    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);

    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  test('menu button has correct accessibility attributes', () => {
    renderWithTheme(<Header showMenuButton={true} />);
    const menuButton = screen.getByTestId('menu-button');

    expect(menuButton).toHaveAttribute('aria-label', 'menu');
  });

  test('header has correct test id', () => {
    renderWithTheme(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('applies correct Material-UI classes', () => {
    renderWithTheme(<Header />);
    const header = screen.getByTestId('header');

    expect(header).toHaveClass('MuiAppBar-root');
  });

  test('toolbar is present', () => {
    renderWithTheme(<Header />);
    const toolbar = document.querySelector('.MuiToolbar-root');
    expect(toolbar).toBeInTheDocument();
  });

  test('title typography has correct variant', () => {
    renderWithTheme(<Header />);
    const title = screen.getByTestId('header-title');

    // Material-UI h6 variant should be applied
    expect(title).toHaveClass('MuiTypography-h6');
  });

  test('header is positioned static', () => {
    renderWithTheme(<Header />);
    const header = screen.getByTestId('header');

    expect(header).toHaveClass('MuiAppBar-positionStatic');
  });
});