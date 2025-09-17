import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProjectsPage from './ProjectsPage';
import * as useProfileData from '../hooks/useProfileData';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
  );
};

// Mock data
const mockProjects = [
  {
    id: 1,
    title: 'Personal Website',
    description: 'A full-stack personal portfolio website with responsive design with Material-UI components and microservices architecture.',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Spring Boot'],
    githubUrl: 'https://github.com/example/personal-website',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Another Project',
    description: 'Another cool project description.',
    technologies: ['Java', 'Node.js'],
    githubUrl: 'https://github.com/example/another-project',
    featured: false,
  },
];

describe('ProjectsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders main heading', () => {
    // Mock loading state
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 1, name: /projects/i })).toBeInTheDocument();
  });

  test('displays loading state', () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);
    expect(screen.getByText(/Loading projects.../i)).toBeInTheDocument();
  });

  test('displays error state when data fails to load', () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch projects',
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);
    expect(screen.getByText(/Error loading projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch projects/i)).toBeInTheDocument();
    expect(screen.getByText('Unable to connect to the backend service. Please try again later.')).toBeInTheDocument();
  });

  test('displays featured projects section when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: /featured projects/i })).toBeInTheDocument();
    });
  });

  test('displays other projects section when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: /other projects/i })).toBeInTheDocument();
    });
  });

  test('shows personal website project when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Personal Website/i)).toBeInTheDocument();
      expect(screen.getByText(/full-stack personal portfolio website/i)).toBeInTheDocument();
    });
  });

  test('displays project technologies as chips when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      const chips = document.querySelectorAll('.MuiChip-root');
      expect(chips.length).toBeGreaterThan(0);

      // Check for some expected technologies
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  test('shows GitHub profile link when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText(/View GitHub Profile/i)).toBeInTheDocument();
      const githubLink = screen.getByRole('link', { name: /View GitHub Profile/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/Nhucanada');
    });
  });

  test('renders project cards with proper structure when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      const cards = document.querySelectorAll('.MuiCard-root');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  test('displays code and demo buttons where applicable when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      const codeButtons = screen.getAllByText(/code/i);
      const demoButtons = screen.getAllByText(/live demo/i);

      expect(codeButtons.length).toBeGreaterThan(0);
      expect(demoButtons.length).toBeGreaterThan(0);
    });
  });

  test('has proper grid layout for projects when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      const gridElements = document.querySelectorAll('.MuiGrid-root');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  test('displays project descriptions when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    await waitFor(() => {
      expect(screen.getByText(/responsive design with Material-UI components/i)).toBeInTheDocument();
      expect(screen.getByText(/microservices architecture/i)).toBeInTheDocument();
    });
  });

  test('handles null data properly', () => {
    jest.spyOn(useProfileData, 'useProjects').mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<ProjectsPage />);

    // Should not render content sections when data is null
    expect(screen.queryByText(/Featured Projects/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Other Projects/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/View GitHub Profile/i)).not.toBeInTheDocument();
  });
});
