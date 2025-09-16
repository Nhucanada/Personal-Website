import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Chip,
  Grid
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
  type: 'work' | 'internship' | 'freelance';
}

const WorkExperiencePage: React.FC = () => {
  const experiences: Experience[] = [
    {
      id: 1,
      company: 'PointClickCare',
      position: 'SWE Intern',
      location: 'Mississauga, Ontario, Canada',
      startDate: '2025-05',
      endDate: '2025-08',
      current: false,
      description: [
        'Full Stack Development on Senior Living Dashboards',
        'Developed enterprise healthcare software solutions',
        'Worked with modern web technologies and databases',
        'Collaborated with cross-functional teams in agile environment'
      ],
      technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'REST APIs'],
      type: 'internship'
    },
    {
      id: 2,
      company: 'Intact',
      position: 'DevOps I',
      location: 'Montreal, Quebec, Canada',
      startDate: '2025-01',
      endDate: '2025-04',
      current: false,
      description: [
        'Software Engineering - Shared Services',
        'Implemented DevOps practices and CI/CD pipelines',
        'Worked on infrastructure automation and deployment',
        'Collaborated on shared services architecture'
      ],
      technologies: ['Jenkins', 'OpenShift', 'CI/CD', 'DevOps', 'Automation'],
      type: 'internship'
    },
    {
      id: 3,
      company: '360insights',
      position: 'Software Engineering Intern',
      location: 'Whitby, Ontario, Canada',
      startDate: '2024-09',
      endDate: '2024-12',
      current: false,
      description: [
        'Working on an agile scrum team on Data Ingress Project',
        'Developing Java routines for data parsing and saving to S3',
        'Integrating testing in CI workflow with Testomat',
        'Investigating, debugging, and developing fixes for issues identified by users'
      ],
      technologies: ['Java', 'S3', 'Testomat', 'CI/CD', 'Agile/Scrum'],
      type: 'internship'
    },
    {
      id: 4,
      company: '360insights',
      position: 'Software Engineering Intern',
      location: 'Whitby, Ontario, Canada',
      startDate: '2024-05',
      endDate: '2024-08',
      current: false,
      description: [
        'Worked on an agile scrum team on Master Data Management',
        'Developed REST APIs for data access with Python',
        'Developed over 100 unit tests with Python unit testing framework and increased coverage from 30 percent to over 90 percent',
        'Developed a new CI pipeline and GitActions workflow to automate regression testing',
        'Used S3 to store API responses for extensive E2E testing, as part of CI/CD workflow',
        'Documented a custom tool written in Java that is used to extract data models from a 3rd party cloud based MDM platform (Reltio)'
      ],
      technologies: ['Python', 'REST APIs', 'Unit Testing', 'GitActions', 'S3', 'CI/CD', 'Java', 'Reltio'],
      type: 'internship'
    },
    {
      id: 5,
      company: 'McGill Computer Science Undergraduate Society',
      position: 'Social Media Executive - Photo/Video',
      location: 'Montreal, Quebec, Canada',
      startDate: '2025-04',
      endDate: '',
      current: true,
      description: [
        'Managing social media content creation and photography',
        'Creating engaging visual content for student community',
        'Coordinating with team members on promotional activities'
      ],
      technologies: ['Content Creation', 'Photography', 'Social Media'],
      type: 'work'
    },
    {
      id: 6,
      company: 'McGill Computer Science Undergraduate Society',
      position: 'Communications Executive - First Year Council',
      location: 'Montreal, Quebec, Canada',
      startDate: '2024-10',
      endDate: '2025-04',
      current: false,
      description: [
        'Facilitated communication between first-year students and CS department',
        'Organized events and initiatives for new computer science students',
        'Collaborated with executive team on student engagement activities'
      ],
      technologies: ['Communication', 'Event Planning', 'Student Leadership'],
      type: 'work'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <WorkIcon />;
      case 'internship':
        return <SchoolIcon />;
      case 'freelance':
        return <BusinessIcon />;
      default:
        return <CodeIcon />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'primary';
      case 'internship':
        return 'secondary';
      case 'freelance':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <WorkIcon sx={{ mr: 2, fontSize: '2rem', color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              Work Experience
            </Typography>
          </Box>

          <Typography variant="body1" paragraph color="text.secondary">
            My professional journey as a Computer Science and AI student at McGill University,
            with internship experience at leading companies in healthcare, insurance, and data analytics.
          </Typography>

          <Timeline position="alternate">
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.id}>
                <TimelineSeparator>
                  <TimelineDot color={getIconColor(experience.type) as any}>
                    {getIcon(experience.type)}
                  </TimelineDot>
                  {index < experiences.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Card elevation={2} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" component="h3">
                          {experience.position}
                        </Typography>
                        <Typography variant="subtitle1" color="primary" fontWeight="bold">
                          {experience.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {experience.location} • {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                          {experience.current && (
                            <Chip
                              label="Current"
                              size="small"
                              color="success"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        {experience.description.map((item, idx) => (
                          <Typography key={idx} variant="body2" component="li" sx={{ mb: 0.5 }}>
                            {item}
                          </Typography>
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {experience.technologies.map((tech, idx) => (
                          <Chip
                            key={idx}
                            label={tech}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    2+
                  </Typography>
                  <Typography variant="body1">
                    Years of Experience
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    5+
                  </Typography>
                  <Typography variant="body1">
                    Internships Completed
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    10+
                  </Typography>
                  <Typography variant="body1">
                    Technologies Mastered
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default WorkExperiencePage;