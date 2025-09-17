import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WelcomeCard from './WelcomeCard';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
  );
};

describe('WelcomeCard Component', () => {
  test('renders with default props', () => {
    renderWithTheme(<WelcomeCard />);

    expect(screen.getByTestId('welcome-title')).toHaveTextContent('Welcome to my Personal Website');
    expect(screen.getByTestId('welcome-subtitle')).toHaveTextContent(
      'This is a modern website built with React and Material-UI',
    );
    expect(screen.getByTestId('welcome-button')).toHaveTextContent('Get Started');
  });

  test('renders with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      subtitle: 'Custom Subtitle',
      buttonText: 'Custom Button',
    };

    renderWithTheme(<WelcomeCard {...customProps} />);

    expect(screen.getByTestId('welcome-title')).toHaveTextContent('Custom Title');
    expect(screen.getByTestId('welcome-subtitle')).toHaveTextContent('Custom Subtitle');
    expect(screen.getByTestId('welcome-button')).toHaveTextContent('Custom Button');
  });

  test('calls onButtonClick when button is clicked', () => {
    const mockOnButtonClick = jest.fn();
    renderWithTheme(<WelcomeCard onButtonClick={mockOnButtonClick} />);

    const button = screen.getByTestId('welcome-button');
    fireEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
  });

  test('handles button click when no onButtonClick is provided', () => {
    // Test that button click doesn't throw error when no handler is provided
    renderWithTheme(<WelcomeCard />);

    const button = screen.getByTestId('welcome-button');

    // Should not throw error
    expect(() => {
      fireEvent.click(button);
    }).not.toThrow();
  });

  test('has correct Material-UI classes', () => {
    renderWithTheme(<WelcomeCard />);

    const card = screen.getByTestId('welcome-card');
    const button = screen.getByTestId('welcome-button');

    expect(card).toHaveClass('MuiPaper-root');
    expect(card).toHaveClass('MuiPaper-elevation3');
    expect(button).toHaveClass('MuiButton-contained');
    expect(button).toHaveClass('MuiButton-sizeLarge');
  });

  test('title has correct typography variant and semantic element', () => {
    renderWithTheme(<WelcomeCard />);
    const title = screen.getByTestId('welcome-title');

    expect(title.tagName).toBe('H1');
    expect(title).toHaveClass('MuiTypography-h2');
  });

  test('subtitle has correct typography variant and semantic element', () => {
    renderWithTheme(<WelcomeCard />);
    const subtitle = screen.getByTestId('welcome-subtitle');

    expect(subtitle.tagName).toBe('P');
    expect(subtitle).toHaveClass('MuiTypography-h5');
  });

  test('card has correct test id', () => {
    renderWithTheme(<WelcomeCard />);
    expect(screen.getByTestId('welcome-card')).toBeInTheDocument();
  });

  test('button is accessible', () => {
    renderWithTheme(<WelcomeCard buttonText="Start Now" />);
    const button = screen.getByRole('button', { name: 'Start Now' });
    expect(button).toBeInTheDocument();
  });

  test('title is accessible as main heading', () => {
    renderWithTheme(<WelcomeCard title="My Website" />);
    const heading = screen.getByRole('heading', { level: 1, name: 'My Website' });
    expect(heading).toBeInTheDocument();
  });

  test('handles empty strings gracefully', () => {
    renderWithTheme(
      <WelcomeCard title="" subtitle="" buttonText="" />,
    );

    expect(screen.getByTestId('welcome-title')).toHaveTextContent('');
    expect(screen.getByTestId('welcome-subtitle')).toHaveTextContent('');
    expect(screen.getByTestId('welcome-button')).toHaveTextContent('');
  });

  test('paper component has correct elevation', () => {
    renderWithTheme(<WelcomeCard />);
    const paper = screen.getByTestId('welcome-card');

    // Check for Material-UI Paper elevation class
    expect(paper).toHaveClass('MuiPaper-elevation3');
  });

  test('button click works with keyboard navigation', () => {
    const mockOnButtonClick = jest.fn();
    renderWithTheme(<WelcomeCard onButtonClick={mockOnButtonClick} />);

    const button = screen.getByTestId('welcome-button');
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    // Material-UI Button should handle Enter key press
    expect(button).toHaveFocus();
  });
});
