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
  styled,
  Collapse,
  IconButton,
  Divider
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon
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
  onClick: (experience: Experience | null) => void;
}

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '400px',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  overflow: 'auto'
}));

const TimelineBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'experienceType' && prop !== 'isActive'
})<{ experienceType: string; isActive: boolean }>(({ theme, experienceType, isActive }) => ({
  position: 'absolute',
  height: '50px',
  borderRadius: '25px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: `3px solid ${isActive ? theme.palette.primary.main : 'transparent'}`,
  boxShadow: isActive ? theme.shadows[6] : theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-3px)',
    border: `2px solid ${theme.palette.primary.light}`
  },
  backgroundColor:
    experienceType === 'work'
      ? theme.palette.primary.main
      : experienceType === 'internship'
      ? theme.palette.secondary.main
      : theme.palette.success.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  fontSize: '0.85rem'
}));

const TimelineAxis = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '30px',
  left: '30px',
  right: '30px',
  height: '3px',
  backgroundColor: theme.palette.divider,
  borderRadius: '2px'
}));

const DrilldownPanel = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper
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
          onClick={() => onClick(selectedExperience?.id === experience.id ? null : experience)}
          sx={{
            left: `${startPos}%`,
            width: `${duration}%`,
            top: `${track * 70 + 30}px`
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              px: 1.5,
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {getIcon(experience.type)}
            <Box sx={{ ml: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
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

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Interactive horizontal timeline showcasing my professional journey. Click on any experience bar to view detailed information in the drilldown panel below.
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
                height: `${Math.max(timelineData.positionedExperiences.reduce((max, exp) => Math.max(max, exp.track), 0) * 70 + 150, 400)}px`
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

          {/* Enhanced Drilldown Panel */}
          <Collapse in={!!selectedExperience} timeout={300}>
            {selectedExperience && (
              <DrilldownPanel elevation={3}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          color: selectedExperience.type === 'work' ? 'primary.main' :
                                 selectedExperience.type === 'internship' ? 'secondary.main' : 'success.main',
                          mr: 1
                        }}
                      >
                        {getIcon(selectedExperience.type)}
                      </Box>
                      <Typography variant="h5" component="h2" fontWeight="bold">
                        {selectedExperience.position}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                      {selectedExperience.company}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {selectedExperience.location} • {formatDate(selectedExperience.startDate)} - {formatDate(selectedExperience.endDate)}
                      {selectedExperience.current && (
                        <Chip
                          label="Current Position"
                          size="small"
                          color="success"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => setSelectedExperience(null)}
                    sx={{ color: 'text.secondary' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                      Key Responsibilities & Achievements
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                      {selectedExperience.description.map((item, idx) => (
                        <Typography key={idx} variant="body1" component="li" sx={{ mb: 1, lineHeight: 1.6 }}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                      Technologies & Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedExperience.technologies.map((tech, idx) => (
                        <Chip
                          key={idx}
                          label={tech}
                          size="medium"
                          variant="outlined"
                          color="primary"
                          sx={{ fontWeight: 'bold' }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </DrilldownPanel>
            )}
          </Collapse>

          {/* Statistics Summary */}

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