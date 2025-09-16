import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Tooltip,
  useTheme,
  styled
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon
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

interface PositionedExperience extends Experience {
  startPos: number;
  duration: number;
  track: number;
  startDateObj: Date;
  endDateObj: Date;
}

interface TimelineBarProps {
  experience: PositionedExperience;
  startPos: number;
  duration: number;
  track: number;
  totalMonths: number;
  onClick: (experience: Experience) => void;
}

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '300px',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  overflow: 'auto'
}));

const TimelineBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'experienceType' && prop !== 'isActive'
})<{ experienceType: string; isActive: boolean }>(({ theme, experienceType, isActive }) => ({
  position: 'absolute',
  height: '40px',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: `2px solid ${isActive ? theme.palette.primary.main : 'transparent'}`,
  boxShadow: isActive ? theme.shadows[4] : theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[3],
    transform: 'translateY(-2px)'
  },
  backgroundColor:
    experienceType === 'work'
      ? theme.palette.primary.main
      : experienceType === 'internship'
      ? theme.palette.secondary.main
      : theme.palette.success.main
}));

const TimelineAxis = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  right: '20px',
  height: '2px',
  backgroundColor: theme.palette.divider
}));

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

const WorkExperiencePage: React.FC = () => {
  const theme = useTheme();
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

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


  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date(); // Current date for ongoing experiences
    const [year, month] = dateString.split('-').map(Number);
    return new Date(year, month - 1); // Month is 0-indexed
  };

  // Calculate timeline positioning
  const timelineData = useMemo(() => {
    const sortedExperiences = [...experiences].sort((a, b) =>
      parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime()
    );

    const earliestDate = parseDate(sortedExperiences[0].startDate);
    const latestDate = new Date(); // Current date
    const totalMonths = (latestDate.getFullYear() - earliestDate.getFullYear()) * 12 +
                       (latestDate.getMonth() - earliestDate.getMonth());

    // Track allocation for overlapping experiences
    const tracks: { start: number; end: number }[] = [];

    const positionedExperiences = sortedExperiences.map(exp => {
      const startDate = parseDate(exp.startDate);
      const endDate = exp.current ? new Date() : parseDate(exp.endDate);

      const startPos = ((startDate.getFullYear() - earliestDate.getFullYear()) * 12 +
                       (startDate.getMonth() - earliestDate.getMonth())) / totalMonths * 100;
      const endPos = ((endDate.getFullYear() - earliestDate.getFullYear()) * 12 +
                     (endDate.getMonth() - earliestDate.getMonth())) / totalMonths * 100;
      const duration = endPos - startPos;

      // Find available track
      let track = 0;
      while (track < tracks.length &&
             tracks[track].end > startPos &&
             tracks[track].start < endPos) {
        track++;
      }

      if (track >= tracks.length) {
        tracks.push({ start: startPos, end: endPos });
      } else {
        tracks[track] = { start: startPos, end: endPos };
      }

      return {
        ...exp,
        startPos,
        duration,
        track,
        startDateObj: startDate,
        endDateObj: endDate
      };
    });

    return { positionedExperiences, totalMonths, earliestDate, latestDate };
  }, []);

  const TimelineBarComponent: React.FC<TimelineBarProps> = ({
    experience, startPos, duration, track, totalMonths, onClick
  }) => {
    return (
      <Tooltip
        title={
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {experience.position}
            </Typography>
            <Typography variant="body2">
              {experience.company}
            </Typography>
            <Typography variant="caption">
              {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
            </Typography>
          </Box>
        }
        placement="top"
      >
        <TimelineBar
          experienceType={experience.type}
          isActive={selectedExperience?.id === experience.id}
          onClick={() => onClick(experience)}
          sx={{
            left: `${startPos}%`,
            width: `${duration}%`,
            top: `${track * 60 + 20}px`
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              px: 1,
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {getIcon(experience.type)}
            <Box sx={{ ml: 0.5, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {experience.company}
            </Box>
          </Box>
        </TimelineBar>
      </Tooltip>
    );
  };

  const generateTimelineLabels = () => {
    const { earliestDate, latestDate } = timelineData;
    const labels = [];
    const current = new Date(earliestDate.getFullYear(), earliestDate.getMonth());

    while (current <= latestDate) {
      const pos = ((current.getFullYear() - earliestDate.getFullYear()) * 12 +
                  (current.getMonth() - earliestDate.getMonth())) /
                  timelineData.totalMonths * 100;

      labels.push({
        position: pos,
        label: current.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      });

      current.setMonth(current.getMonth() + 6); // Every 6 months
    }

    return labels;
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

          {/* Interactive Timeline Visualization */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Timeline Overview
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Interactive timeline showing overlapping work experiences. Click on any bar to view details.
            </Typography>

            {/* Legend */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 16, height: 16, bgcolor: 'primary.main', borderRadius: 1, mr: 1 }} />
                <Typography variant="caption">Work</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 16, height: 16, bgcolor: 'secondary.main', borderRadius: 1, mr: 1 }} />
                <Typography variant="caption">Internship</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 16, height: 16, bgcolor: 'success.main', borderRadius: 1, mr: 1 }} />
                <Typography variant="caption">Freelance</Typography>
              </Box>
            </Box>

            <TimelineContainer
              sx={{
                height: `${Math.max(timelineData.positionedExperiences.reduce((max, exp) => Math.max(max, exp.track), 0) * 60 + 120, 200)}px`
              }}
            >
              {/* Timeline bars */}
              {timelineData.positionedExperiences.map((exp) => (
                <TimelineBarComponent
                  key={exp.id}
                  experience={exp}
                  startPos={exp.startPos}
                  duration={exp.duration}
                  track={exp.track}
                  totalMonths={timelineData.totalMonths}
                  onClick={setSelectedExperience}
                />
              ))}

              {/* Timeline axis */}
              <TimelineAxis />

              {/* Timeline labels */}
              {generateTimelineLabels().map((label, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    bottom: '0px',
                    left: `${label.position}%`,
                    transform: 'translateX(-50%)',
                    fontSize: '0.75rem',
                    color: 'text.secondary'
                  }}
                >
                  {label.label}
                </Box>
              ))}
            </TimelineContainer>
          </Box>

          {/* Selected Experience Details */}
          {selectedExperience && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Selected Experience
              </Typography>
              <Card elevation={3} sx={{ border: `2px solid ${theme.palette.primary.main}` }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h3">
                      {selectedExperience.position}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {selectedExperience.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedExperience.location} • {formatDate(selectedExperience.startDate)} - {formatDate(selectedExperience.endDate)}
                      {selectedExperience.current && (
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
                    {selectedExperience.description.map((item, idx) => (
                      <Typography key={idx} variant="body2" component="li" sx={{ mb: 0.5 }}>
                        {item}
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedExperience.technologies.map((tech, idx) => (
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
            </Box>
          )}

          {/* All Experiences List */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              All Experiences
            </Typography>
            <Grid container spacing={2}>
              {experiences.map((experience) => (
                <Grid item xs={12} md={6} key={experience.id}>
                  <Card
                    elevation={1}
                    sx={{
                      cursor: 'pointer',
                      border: selectedExperience?.id === experience.id ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
                      '&:hover': { elevation: 2 }
                    }}
                    onClick={() => setSelectedExperience(experience)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box
                          sx={{
                            color: experience.type === 'work' ? 'primary.main' :
                                   experience.type === 'internship' ? 'secondary.main' : 'success.main'
                          }}
                        >
                          {getIcon(experience.type)}
                        </Box>
                        <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                          {experience.position}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2" color="primary" fontWeight="bold">
                        {experience.company}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                        {experience.current && (
                          <Chip
                            label="Current"
                            size="small"
                            color="success"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

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