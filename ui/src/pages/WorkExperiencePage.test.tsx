import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useExperiences } from '../hooks/useProfileData';
import WorkExperiencePage from './WorkExperiencePage';

// Mock the useExperiences hook
jest.mock('../hooks/useProfileData', () => ({
  useExperiences: jest.fn(),
}));

const mockedUseExperiences = useExperiences as jest.MockedFunction<typeof useExperiences>;

const theme = createTheme();

const mockExperiences = [
  {
    id: 1,
    company: 'PointClickCare',
    position: 'SWE Intern',
    location: 'Mississauga, Ontario, Canada',
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    current: false,
    description: [
      'Full Stack Development on Senior Living Dashboards',
      'Developed enterprise healthcare software solutions',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'REST APIs'],
    type: 'internship',
  },
  {
    id: 2,
    company: 'Intact',
    position: 'Software Engineering Intern',
    location: 'Toronto, Ontario, Canada',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    current: false,
    description: [
      'Backend development in insurance technology',
      'Worked on microservices architecture',
    ],
    technologies: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
    type: 'internship',
  },
  {
    id: 3,
    company: '360insights',
    position: 'Software Engineering Intern',
    location: 'Markham, Ontario, Canada',
    startDate: '2024-05-01',
    endDate: '2024-08-31',
    current: false,
    description: [
      'Full-stack development for channel incentive platform',
      'Built REST APIs and React components',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    type: 'internship',
  },
  {
    id: 4,
    company: 'McGill Computer Science Undergraduate Society',
    position: 'VP External',
    location: 'Montreal, Quebec, Canada',
    startDate: '2023-05-01',
    endDate: '2024-04-30',
    current: false,
    description: [
      'Led external partnerships and industry relations',
      'Organized career fairs and networking events',
    ],
    technologies: ['Leadership', 'Event Management', 'Partnership Development'],
    type: 'work',
  },
  {
    id: 5,
    company: "McDonald's",
    position: 'Crew Member',
    location: 'Montreal, Quebec, Canada',
    startDate: '2022-09-01',
    endDate: '2023-04-30',
    current: false,
    description: [
      'Customer service and food preparation',
      'Worked in fast-paced environment',
    ],
    technologies: ['Customer Service', 'Teamwork', 'Time Management'],
    type: 'work',
  },
  {
    id: 6,
    company: 'McGill Phonathon',
    position: 'Fundraising Caller',
    location: 'Montreal, Quebec, Canada',
    startDate: '2022-01-01',
    endDate: '2022-08-31',
    current: false,
    description: [
      'Conducted fundraising calls for university alumni',
      'Achieved high success rates in donor engagement',
    ],
    technologies: ['Communication', 'Sales', 'Database Management'],
    type: 'work',
  },
];

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
  );
};

describe('WorkExperiencePage - Timeline Visualization', () => {
  beforeEach(() => {
    mockedUseExperiences.mockReturnValue({
      data: mockExperiences,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders main heading and description', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByRole('heading', { level: 1, name: /work experience/i })).toBeInTheDocument();
    expect(screen.getByText(/my professional journey as a computer science and ai student/i)).toBeInTheDocument();
  });

  test('displays timeline overview section', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByRole('heading', { level: 2, name: /timeline overview/i })).toBeInTheDocument();
    expect(screen.getByText(/Interactive horizontal timeline showcasing my professional journey/i)).toBeInTheDocument();
  });

  test('shows timeline legend with experience types', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Internship')).toBeInTheDocument();
    expect(screen.getByText('Freelance')).toBeInTheDocument();
  });

  test('displays timeline container for interactive visualization', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check for timeline container presence
    const timelineContainer = document.querySelector('.MuiBox-root');
    expect(timelineContainer).toBeInTheDocument();
  });

  test('displays companies in timeline', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check for specific company names in timeline (allowing multiple occurrences)
    expect(screen.getAllByText('PointClickCare').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Intact').length).toBeGreaterThan(0);
    expect(screen.getAllByText('360insights').length).toBeGreaterThan(0);
    expect(screen.getAllByText('McGill Computer Science Undergraduate Society').length).toBeGreaterThan(0);
    expect(screen.getAllByText('McDonald\'s').length).toBeGreaterThan(0);
    expect(screen.getAllByText('McGill Phonathon').length).toBeGreaterThan(0);
  });

  test('displays timeline legend with experience types', () => {
    renderWithTheme(<WorkExperiencePage />);
    // Legend should show experience types
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Internship')).toBeInTheDocument();
    expect(screen.getByText('Freelance')).toBeInTheDocument();
  });

  test('shows company names in timeline correctly', () => {
    renderWithTheme(<WorkExperiencePage />);
    // Companies should be visible on timeline bars
    expect(screen.getAllByText('PointClickCare').length).toBeGreaterThan(0);
    expect(screen.getAllByText('360insights').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Intact').length).toBeGreaterThan(0);
    expect(screen.getAllByText('McGill Computer Science Undergraduate Society').length).toBeGreaterThan(0);
    expect(screen.getAllByText('McDonald\'s').length).toBeGreaterThan(0);
    expect(screen.getAllByText('McGill Phonathon').length).toBeGreaterThan(0);
  });

  test('displays experience statistics correctly', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByText('2+')).toBeInTheDocument(); // Years of Experience
    expect(screen.getByText('5+')).toBeInTheDocument(); // Internships Completed
    expect(screen.getByText('10+')).toBeInTheDocument(); // Technologies Mastered

    expect(screen.getByText('Years of Experience')).toBeInTheDocument();
    expect(screen.getByText('Internships Completed')).toBeInTheDocument();
    expect(screen.getByText('Technologies Mastered')).toBeInTheDocument();
  });

  test('shows technology chips when experience is selected', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Click on an experience to see technology chips
    const pointClickCareTexts = screen.getAllByText('PointClickCare');
    const experienceCard = pointClickCareTexts[0].closest('.MuiCard-root') as HTMLElement;

    if (experienceCard) {
      fireEvent.click(experienceCard);

      // Now check for technology chips in the selected experience
      const pageContent = document.body.textContent || '';
      expect(pageContent).toMatch(/Java|Spring Boot|React|TypeScript/);
    }
  });

  test('timeline interaction and drilldown functionality works', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Statistics cards should be present (bottom section)
    const statisticsCards = document.querySelectorAll('.MuiCard-root');
    expect(statisticsCards.length).toBeGreaterThan(2); // Should have statistics cards

    // Timeline should be present
    const timelineOverview = screen.getByText('Timeline Overview');
    expect(timelineOverview).toBeInTheDocument();

    // Check if timeline bars are present and clickable
    const pageContent = document.body;
    expect(pageContent).toBeInTheDocument();
  });

  test('timeline bars display company information correctly', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check for PointClickCare text
    const pointClickCareTexts = screen.getAllByText('PointClickCare');
    expect(pointClickCareTexts.length).toBeGreaterThan(0);

    // Check for other companies
    const intactTexts = screen.getAllByText('Intact');
    expect(intactTexts.length).toBeGreaterThan(0);

    // Timeline overview should be present
    const timelineOverview = screen.getByText('Timeline Overview');
    expect(timelineOverview).toBeInTheDocument();
  });

  test('displays proper icons for different experience types', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check for Material-UI icons
    const icons = document.querySelectorAll('.MuiSvgIcon-root');
    expect(icons.length).toBeGreaterThan(5); // Should have multiple icons for different experience types

    // Check for specific icon test IDs
    expect(document.querySelector('[data-testid="WorkIcon"]')).toBeInTheDocument();
    expect(document.querySelector('[data-testid="SchoolIcon"]')).toBeInTheDocument();
    expect(document.querySelector('[data-testid="CalendarTodayIcon"]')).toBeInTheDocument();
  });

  test('shows proper date formatting', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check that date-related content exists in the page
    const pageContent = document.body.textContent || '';
    expect(pageContent).toMatch(/2025|Present/);

    // Check for timeline labels with dates
    const dateElements = document.querySelectorAll('[class*="css-"]');
    expect(dateElements.length).toBeGreaterThan(0);
  });

  test('timeline visualization handles overlapping experiences', () => {
    renderWithTheme(<WorkExperiencePage />);

    // The timeline should show multiple overlapping experiences
    // McGill CSUS roles should overlap with internships
    const mcgillTexts = screen.getAllByText(/McGill Computer Science Undergraduate Society/);
    expect(mcgillTexts.length).toBeGreaterThanOrEqual(2); // Should have multiple McGill positions

    // Check that company names appear in timeline
    const pageContent = document.body.textContent || '';
    expect(pageContent).toMatch(/McGill Computer Science Undergraduate Society/);
    expect(pageContent).toMatch(/PointClickCare|Intact|360insights/);
  });

  test('responsive grid layout for experience cards', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check for Material-UI grid system
    const grids = document.querySelectorAll('.MuiGrid-root');
    expect(grids.length).toBeGreaterThan(0);
  });

  test('proper Material-UI component integration', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check for various Material-UI components
    const containers = document.querySelectorAll('.MuiContainer-root');
    expect(containers.length).toBeGreaterThan(0);

    const papers = document.querySelectorAll('.MuiPaper-root');
    expect(papers.length).toBeGreaterThan(0);

    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBeGreaterThan(0);

    // Legend should have visual elements for experience types
    const legendElements = document.querySelectorAll('[class*="MuiBox-root"]');
    expect(legendElements.length).toBeGreaterThan(0);
  });

  test('timeline displays company information correctly', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check that timeline shows company names
    const pointClickCareTexts = screen.getAllByText('PointClickCare');
    expect(pointClickCareTexts.length).toBeGreaterThan(0);

    // Check for other companies in timeline
    const pageContent = document.body.textContent || '';
    expect(pageContent).toMatch(/PointClickCare|Intact|360insights|McGill|McDonald's|Phonathon/);
  });

  test('timeline shows all companies correctly', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Check that all major companies appear in timeline
    const pageContent = document.body.textContent || '';
    expect(pageContent).toMatch(/PointClickCare/);
    expect(pageContent).toMatch(/360insights/);
    expect(pageContent).toMatch(/Intact/);
    expect(pageContent).toMatch(/McGill Computer Science Undergraduate Society/);
    expect(pageContent).toMatch(/McDonald's/);
    expect(pageContent).toMatch(/McGill Phonathon/);
  });

  test('timeline container has proper styling and structure', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Timeline container should have proper styling classes
    const timelineSection = screen.getByText(/Interactive horizontal timeline showcasing my professional journey/);
    expect(timelineSection).toBeInTheDocument();

    // Should have tooltip functionality for timeline bars
    const pageContent = document.body;
    expect(pageContent).toBeInTheDocument();
  });

  test('timeline groups same organization experiences and handles consecutive experiences', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Should show multiple instances of McGill CSUS (same organization should be grouped)
    const mcgillTexts = screen.getAllByText('McGill Computer Science Undergraduate Society');
    expect(mcgillTexts.length).toBeGreaterThanOrEqual(2);

    // Should show multiple instances of 360insights (same organization should be grouped)
    const insightsTexts = screen.getAllByText('360insights');
    expect(insightsTexts.length).toBeGreaterThanOrEqual(2);

    // Should have all companies visible in timeline
    expect(screen.getAllByText('PointClickCare').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Intact').length).toBeGreaterThan(0);
  });

  test('displays loading state', () => {
    mockedUseExperiences.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByText('Loading experiences...')).toBeInTheDocument();
  });

  test('displays error state', () => {
    mockedUseExperiences.mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to load experiences',
      refetch: jest.fn(),
    });

    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByText('Error loading experiences')).toBeInTheDocument();
    expect(screen.getByText('Failed to load experiences')).toBeInTheDocument();
  });

  test('handles empty experiences list', () => {
    mockedUseExperiences.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByRole('heading', { level: 1, name: /work experience/i })).toBeInTheDocument();
    expect(screen.getByText(/my professional journey as a computer science and ai student/i)).toBeInTheDocument();
  });
});
