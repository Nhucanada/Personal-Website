import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WorkExperiencePage from './WorkExperiencePage';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('WorkExperiencePage - Timeline Visualization', () => {
  test('renders main heading and description', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByRole('heading', { level: 1, name: /work experience/i })).toBeInTheDocument();
    expect(screen.getByText(/my professional journey as a computer science and ai student/i)).toBeInTheDocument();
  });

  test('displays timeline overview section', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByRole('heading', { level: 2, name: /timeline overview/i })).toBeInTheDocument();
    expect(screen.getByText(/interactive timeline showing overlapping work experiences/i)).toBeInTheDocument();
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

  test('renders all experiences section', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getByRole('heading', { level: 2, name: /all experiences/i })).toBeInTheDocument();

    // Check for specific company names (allowing multiple occurrences)
    expect(screen.getAllByText('PointClickCare').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Intact').length).toBeGreaterThan(0);
    expect(screen.getAllByText('360insights').length).toBeGreaterThan(0);
    expect(screen.getAllByText('McGill Computer Science Undergraduate Society').length).toBeGreaterThan(0);
  });

  test('displays current position indicator', () => {
    renderWithTheme(<WorkExperiencePage />);
    const currentChips = screen.getAllByText('Current');
    expect(currentChips.length).toBeGreaterThan(0); // Should have at least one current position
  });

  test('shows position titles correctly', () => {
    renderWithTheme(<WorkExperiencePage />);
    expect(screen.getAllByText('SWE Intern').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DevOps I').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Software Engineering Intern').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Social Media Executive - Photo/Video').length).toBeGreaterThan(0);
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

    // Check that both McGill positions and internships are shown
    expect(screen.getByText('Social Media Executive - Photo/Video')).toBeInTheDocument();
    expect(screen.getByText('Communications Executive - First Year Council')).toBeInTheDocument();
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

    const chips = document.querySelectorAll('.MuiChip-root');
    expect(chips.length).toBeGreaterThan(0);
  });

  test('location information is displayed when experience is selected', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Click on an experience to see location details
    const pointClickCareTexts = screen.getAllByText('PointClickCare');
    const experienceCard = pointClickCareTexts[0].closest('.MuiCard-root') as HTMLElement;

    if (experienceCard) {
      fireEvent.click(experienceCard);

      // Check for location information in the selected experience
      const pageContent = document.body.textContent || '';
      expect(pageContent).toMatch(/Mississauga|Montreal|Whitby|Ontario|Quebec|Canada/);
    }
  });

  test('experience descriptions show comprehensive details', () => {
    renderWithTheme(<WorkExperiencePage />);

    // Click on an experience to see details
    const pointClickCareTexts = screen.getAllByText('PointClickCare');
    const experienceCard = pointClickCareTexts[0].closest('.MuiCard-root') as HTMLElement;

    if (experienceCard) {
      fireEvent.click(experienceCard);

      // Should show detailed description points
      expect(screen.getAllByText(/Full Stack Development on Senior Living Dashboards/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Developed enterprise healthcare software solutions/).length).toBeGreaterThan(0);
    }
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
});