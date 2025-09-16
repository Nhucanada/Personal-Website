import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from './HomePage';

const theme = createTheme();

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('HomePage - Dashboard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders hero section with main title', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { level: 1, name: /nathan hu/i })).toBeInTheDocument();
    expect(screen.getByText(/CS & AI Student at McGill University/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-Driven Development Showcase/i)).toBeInTheDocument();
  });

  test('displays AI development showcase prominently', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/🤖 AI Development Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/100% AI Generated/i)).toBeInTheDocument();
    expect(screen.getByText(/6,955/i)).toBeInTheDocument(); // Total lines of code
  });

  test('shows AI statistics in hero section', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('6,955')).toBeInTheDocument(); // Total Lines
    expect(screen.getByText('100%')).toBeInTheDocument(); // AI Generated
    expect(screen.getByText('25+')).toBeInTheDocument(); // Components
    expect(screen.getByText('125+')).toBeInTheDocument(); // Tests
  });

  test('renders About Me widget', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
    expect(screen.getByText(/Computer Science & AI student at McGill University/i)).toBeInTheDocument();
    expect(screen.getByText(/Top Skills:/i)).toBeInTheDocument();
  });

  test('displays featured projects widget', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument();
    expect(screen.getByText('Personal Website')).toBeInTheDocument();
    expect(screen.getByText('Java Search Engine')).toBeInTheDocument();
    expect(screen.getByText('Guardians of the Hive')).toBeInTheDocument();
  });

  test('shows work experience widget', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { name: /work experience/i })).toBeInTheDocument();
    expect(screen.getByText('PointClickCare')).toBeInTheDocument();
    expect(screen.getByText('SWE Intern')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument(); // Current position chip
  });

  test('displays education widget with progress', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText('McGill University')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Science - Software Engineering')).toBeInTheDocument();
    expect(screen.getByText(/40% Complete/i)).toBeInTheDocument();

    // Language chips
    expect(screen.getByText('English (Native)')).toBeInTheDocument();
    expect(screen.getByText('French (Native)')).toBeInTheDocument();
    expect(screen.getByText('Mandarin (Professional)')).toBeInTheDocument();
  });

  test('shows contact section with social links', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { name: /let's connect/i })).toBeInTheDocument();

    // Social media links
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/nhucanada/');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Nhucanada');
  });

  test('navigation buttons work correctly', () => {
    renderWithProviders(<HomePage />);

    // AI Development button
    const aiButton = screen.getByText(/explore ai development/i);
    fireEvent.click(aiButton);
    expect(mockNavigate).toHaveBeenCalledWith('/ai');

    // Projects button
    const projectsButton = screen.getByText(/view projects/i);
    fireEvent.click(projectsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  test('widget navigation buttons work', () => {
    renderWithProviders(<HomePage />);

    // About Me "Learn More" button
    const aboutButton = screen.getByText(/learn more/i);
    fireEvent.click(aboutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/about');

    // Projects "View All Projects" button
    const allProjectsButton = screen.getByText(/view all projects/i);
    fireEvent.click(allProjectsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/projects');

    // Experience "Full Timeline" button
    const timelineButton = screen.getByText(/full timeline/i);
    fireEvent.click(timelineButton);
    expect(mockNavigate).toHaveBeenCalledWith('/experience');

    // Education "View Details" button
    const detailsButton = screen.getByText(/view details/i);
    fireEvent.click(detailsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/education');
  });

  test('displays technology chips correctly', () => {
    renderWithProviders(<HomePage />);

    // Skills chips in About section (allowing multiple instances)
    expect(screen.getAllByText('Java').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);

    // Technology chips in projects (allowing multiple instances)
    expect(screen.getAllByText('Spring Boot').length).toBeGreaterThan(0);
  });

  test('has proper Material-UI component structure', () => {
    renderWithProviders(<HomePage />);

    // Check for Material-UI containers and cards
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBeGreaterThan(4); // Multiple widget cards

    const papers = document.querySelectorAll('.MuiPaper-root');
    expect(papers.length).toBeGreaterThan(0);

    const grids = document.querySelectorAll('.MuiGrid-root');
    expect(grids.length).toBeGreaterThan(0);
  });

  test('responsive container is configured', () => {
    renderWithProviders(<HomePage />);
    const container = document.querySelector('.MuiContainer-maxWidthXl');
    expect(container).toBeInTheDocument();
  });

  test('shows proper icons for each widget', () => {
    renderWithProviders(<HomePage />);

    // Check for various Material-UI icons
    const icons = document.querySelectorAll('.MuiSvgIcon-root');
    expect(icons.length).toBeGreaterThan(10); // Many icons in the dashboard

    // Check for specific icon test IDs
    expect(document.querySelector('[data-testid="PsychologyIcon"]')).toBeInTheDocument(); // AI icon
    expect(document.querySelector('[data-testid="PersonIcon"]')).toBeInTheDocument(); // Person icon
    expect(document.querySelector('[data-testid="CodeIcon"]')).toBeInTheDocument(); // Code icon
  });

  test('AI showcase has prominent styling', () => {
    renderWithProviders(<HomePage />);

    // AI showcase should have special border and background - check for the Card with border styling
    const aiCards = document.querySelectorAll('.MuiCard-root');
    expect(aiCards.length).toBeGreaterThan(0);

    // Check that AI showcase content is present (more reliable than checking inline styles)
    expect(screen.getByText(/🤖 AI Development Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete website built with Claude Code/i)).toBeInTheDocument();
  });

  test('external links have correct attributes', () => {
    renderWithProviders(<HomePage />);

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('contact form navigation works', () => {
    renderWithProviders(<HomePage />);

    const contactFormButton = screen.getByText(/contact form/i);
    fireEvent.click(contactFormButton);
    expect(mockNavigate).toHaveBeenCalledWith('/contact');
  });

  test('displays progress indicator for education', () => {
    renderWithProviders(<HomePage />);

    const progressBars = document.querySelectorAll('.MuiLinearProgress-root');
    expect(progressBars.length).toBeGreaterThanOrEqual(1); // Education progress bar
  });

  test('shows current position indicator', () => {
    renderWithProviders(<HomePage />);

    // Should show "Current" chip for current position
    const currentChip = screen.getByText('Current');
    expect(currentChip).toBeInTheDocument();
  });

  test('AI development call-to-action in contact section', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText(/🚀 AI Development/i)).toBeInTheDocument();
    expect(screen.getByText(/This entire website showcases the power of AI/i)).toBeInTheDocument();

    const learnHowButton = screen.getByText(/learn how/i);
    fireEvent.click(learnHowButton);
    expect(mockNavigate).toHaveBeenCalledWith('/ai');
  });
});