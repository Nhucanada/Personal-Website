import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AboutPage from './AboutPage';
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
const mockPersonalInfo = {
  name: 'Nathan Hu',
  title: 'CS & AI Student at McGill University',
  location: 'Montreal, QC',
  bio: 'Nathan Hu, currently pursuing Computer Science and AI at McGill University.',
  description: 'Passionate about software development and machine learning.',
  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'French', proficiency: 'Intermediate' }
  ],
  contact: {
    email: 'nathan@example.com',
    mcgillEmail: 'nathan.hu@mail.mcgill.ca',
    linkedin: 'https://linkedin.com/in/nathanhu',
    github: 'https://github.com/nathanhu',
    location: 'Montreal, QC'
  }
};

const mockSkills = {
  technicalSkills: ['Java', 'React', 'TypeScript', 'Jenkins'],
  categories: {
    'Areas of Interest': ['Backend Development', 'Machine Learning']
  },
  proficiencyLevels: {}
};

describe('AboutPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders main heading', () => {
    // Mock loading state
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1, name: /about me/i })).toBeInTheDocument();
  });

  test('displays subtitle', () => {
    // Mock loading state
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/CS & AI Student at McGill University/i)).toBeInTheDocument();
  });

  test('shows avatar component', () => {
    // Mock loading state
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);
    const avatar = document.querySelector('.MuiAvatar-root');
    expect(avatar).toBeInTheDocument();
  });

  test('displays loading state', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/Loading personal information.../i)).toBeInTheDocument();
  });

  test('displays error state when data fails to load', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch personal info',
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch skills',
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);
    expect(screen.getByText(/Error loading personal information/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch personal info/i)).toBeInTheDocument();
  });

  test('displays my story section when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: mockPersonalInfo,
      loading: false,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: mockSkills,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);

    await waitFor(() => {
      expect(screen.getByText(/My Story/i)).toBeInTheDocument();
      expect(screen.getByText(/Nathan Hu, currently pursuing Computer Science and AI/i)).toBeInTheDocument();
    });
  });

  test('renders technical skills section when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: mockPersonalInfo,
      loading: false,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: mockSkills,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);

    await waitFor(() => {
      expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();
      // Check for some expected skills
      expect(screen.getByText('Java')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Jenkins')).toBeInTheDocument();
    });
  });

  test('displays areas of interest when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: mockPersonalInfo,
      loading: false,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: mockSkills,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);

    await waitFor(() => {
      expect(screen.getByText('Backend Development')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    });
  });

  test('shows philosophy section when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: mockPersonalInfo,
      loading: false,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: mockSkills,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);

    await waitFor(() => {
      expect(screen.getByText(/Philosophy/i)).toBeInTheDocument();
      expect(screen.getByText(/always eager to learn new things and build impactful projects/i)).toBeInTheDocument();
    });
  });

  test('has proper grid layout when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: mockPersonalInfo,
      loading: false,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: mockSkills,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);

    await waitFor(() => {
      const gridElements = document.querySelectorAll('.MuiGrid-root');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  test('skills are rendered as chips when data loads successfully', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: mockPersonalInfo,
      loading: false,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: mockSkills,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);

    await waitFor(() => {
      const chips = document.querySelectorAll('.MuiChip-root');
      expect(chips.length).toBeGreaterThan(0);
    });
  });

  test('handles null data properly', async () => {
    jest.spyOn(useProfileData, 'usePersonalInfo').mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn()
    });
    jest.spyOn(useProfileData, 'useSkills').mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn()
    });

    renderWithTheme(<AboutPage />);

    // Should not render content sections when data is null
    expect(screen.queryByText(/My Story/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Technical Skills/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Philosophy/i)).not.toBeInTheDocument();
  });
});
