import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AIPage from './AIPage';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('AIPage', () => {
  test('renders main heading', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { level: 1, name: /ai development showcase/i })).toBeInTheDocument();
  });

  test('displays AI contribution statistics section', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { name: /ai contribution statistics/i })).toBeInTheDocument();
    expect(screen.getByText(/total project/i)).toBeInTheDocument();
    expect(screen.getByText(/100% ai generated/i)).toBeInTheDocument();
  });

  test('shows overall project statistics', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByText(/3,847 lines of code/i)).toBeInTheDocument();
    expect(screen.getByText(/100% AI Generated/i)).toBeInTheDocument();
  });

  test('displays module breakdown cards', () => {
    renderWithTheme(<AIPage />);

    // Check for module categories
    expect(screen.getByText('Frontend (UI)')).toBeInTheDocument();
    expect(screen.getByText('Backend (API)')).toBeInTheDocument();
    expect(screen.getByText('Build & Config')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();

    // Check for line counts (allowing for multiple occurrences)
    expect(screen.getAllByText(/2,234/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/267/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/189/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/1,157/).length).toBeGreaterThanOrEqual(1);
  });

  test('renders AI-developed features section', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { name: /ai-developed features/i })).toBeInTheDocument();

    // Check for key features
    expect(screen.getByText('Responsive Portfolio Design')).toBeInTheDocument();
    expect(screen.getByText('Professional Content Integration')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive Testing Suite')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Architecture')).toBeInTheDocument();
    expect(screen.getByText('Build System Optimization')).toBeInTheDocument();
    expect(screen.getByText('Documentation Excellence')).toBeInTheDocument();
  });

  test('displays AI capabilities section', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { name: /ai capabilities demonstrated/i })).toBeInTheDocument();
    expect(screen.getByText(/complete project architecture design/i)).toBeInTheDocument();
    expect(screen.getByText(/real-time problem solving and debugging/i)).toBeInTheDocument();
    expect(screen.getByText(/comprehensive testing strategy/i)).toBeInTheDocument();
  });

  test('shows technical decisions section', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { name: /ai technical decisions/i })).toBeInTheDocument();

    // Check for accordion text content which might be collapsed initially
    const accordions = document.querySelectorAll('.MuiAccordion-root');
    expect(accordions.length).toBeGreaterThan(0);
  });

  test('displays development methodology cards', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { name: /ai development methodology/i })).toBeInTheDocument();
    expect(screen.getByText('Iterative Development')).toBeInTheDocument();
    expect(screen.getByText('Test-Driven Approach')).toBeInTheDocument();
    expect(screen.getByText('Documentation-First')).toBeInTheDocument();
  });

  test('shows problem-solving examples', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { name: /ai problem-solving examples/i })).toBeInTheDocument();
    expect(screen.getByText('Maven Build Compatibility Issues')).toBeInTheDocument();
    expect(screen.getByText('Material-UI Timeline Component Import Error')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn Profile Data Integration')).toBeInTheDocument();
  });

  test('displays progress bars for each module', () => {
    renderWithTheme(<AIPage />);
    const progressBars = document.querySelectorAll('.MuiLinearProgress-root');
    expect(progressBars.length).toBeGreaterThanOrEqual(4); // One for each module
  });

  test('shows complexity chips for features', () => {
    renderWithTheme(<AIPage />);

    // Check for complexity chips in the features section
    const chips = document.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBeGreaterThan(0);

    // Check that complexity indicators exist somewhere in the page
    const pageContent = document.body.textContent || '';
    expect(pageContent).toMatch(/High|Medium|Low/);
  });

  test('displays technology chips', () => {
    renderWithTheme(<AIPage />);

    // Check for technology chips - these might be in different features
    const chips = document.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBeGreaterThan(0);

    // Check for some key technologies in the page content
    const pageContent = document.body.textContent || '';
    expect(pageContent).toMatch(/React|TypeScript|Material-UI|Jest|Spring Boot/);
  });

  test('includes AI development resources section', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByRole('heading', { name: /ai development resources/i })).toBeInTheDocument();

    // Check for Claude Code mention in page content
    const pageContent = document.body.textContent || '';
    expect(pageContent).toMatch(/Claude Code/);
    expect(pageContent).toMatch(/AI_CONTRIBUTIONS\.md/);
  });

  test('has proper Material-UI component integration', () => {
    renderWithTheme(<AIPage />);

    // Check for Material-UI containers and papers
    const papers = document.querySelectorAll('.MuiPaper-root');
    expect(papers.length).toBeGreaterThan(0);

    // Check for cards
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBeGreaterThan(0);

    // Check for accordions
    const accordions = document.querySelectorAll('.MuiAccordion-root');
    expect(accordions.length).toBeGreaterThan(0);
  });

  test('displays correct line counts for features', () => {
    renderWithTheme(<AIPage />);
    expect(screen.getByText('1245 lines')).toBeInTheDocument(); // Responsive Portfolio Design
    expect(screen.getByText('856 lines')).toBeInTheDocument(); // Professional Content Integration
    expect(screen.getByText('623 lines')).toBeInTheDocument(); // Comprehensive Testing Suite
    expect(screen.getByText('412 lines')).toBeInTheDocument(); // Full-Stack Architecture
  });

  test('shows proper icon usage', () => {
    renderWithTheme(<AIPage />);

    // Main AI icon should be present
    const aiIcons = document.querySelectorAll('[data-testid="PsychologyIcon"]');
    expect(aiIcons.length).toBeGreaterThanOrEqual(1);

    // Check for any MUI icons in general
    const allIcons = document.querySelectorAll('.MuiSvgIcon-root');
    expect(allIcons.length).toBeGreaterThan(0);
  });

  test('has accessible heading hierarchy', () => {
    renderWithTheme(<AIPage />);

    // Check that h1 exists
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();

    // Check that h2 headings exist
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings.length).toBeGreaterThan(0);

    // Check that h3 headings exist
    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    expect(h3Headings.length).toBeGreaterThan(0);
  });

  test('displays percentage calculations correctly', () => {
    renderWithTheme(<AIPage />);

    // Each module should show 100% AI
    const percentageTexts = screen.getAllByText(/100% AI/);
    expect(percentageTexts.length).toBeGreaterThanOrEqual(4); // One for each module
  });

  test('renders grid layouts properly', () => {
    renderWithTheme(<AIPage />);

    // Check for Material-UI grid containers
    const grids = document.querySelectorAll('.MuiGrid-root');
    expect(grids.length).toBeGreaterThan(0);
  });

  test('includes external link to documentation', () => {
    renderWithTheme(<AIPage />);
    const documentationLink = screen.getByRole('link', { name: /AI_CONTRIBUTIONS.md/i });
    expect(documentationLink).toBeInTheDocument();
    expect(documentationLink).toHaveAttribute('target', '_blank');
    expect(documentationLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});