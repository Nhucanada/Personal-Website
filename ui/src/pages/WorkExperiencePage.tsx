import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  Chip,
  Grid,
  Tooltip,
  styled,
  Collapse,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useExperiences } from '../hooks/useProfileData';
import { Experience } from '../utils/api';

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
  minHeight: '300px',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  overflowX: 'auto',
  overflowY: 'hidden',
  minWidth: '800px', // Minimum width to ensure horizontal scroll
  width: '100%',
}));

const TimelineScrollContainer = styled(Box)(() => ({
  position: 'relative',
  minWidth: '1200px', // Force horizontal scroll for longer timeline
  height: '100%',
}));

const TimelineBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'experienceType' && prop !== 'isActive',
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
    border: `2px solid ${theme.palette.primary.light}`,
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
  fontSize: '0.85rem',
}));

const TimelineAxis = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '40px',
  left: '0px',
  right: '0px',
  height: '3px',
  backgroundColor: theme.palette.divider,
  borderRadius: '2px',
}));

const DrilldownPanel = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
}));

const WorkExperiencePage: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { data: experiences, loading, error } = useExperiences();

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
    if (!experiences || experiences.length === 0) {
      return {
        positionedExperiences: [], totalMonths: 0, earliestDate: new Date(), latestDate: new Date(),
      };
    }

    const sortedExperiences = [...experiences].sort((a, b) =>
      parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime(),
    );

    const earliestDate = parseDate(sortedExperiences[0].startDate);
    const latestDate = new Date(); // Current date
    const totalMonths = (latestDate.getFullYear() - earliestDate.getFullYear()) * 12 +
                       (latestDate.getMonth() - earliestDate.getMonth());

    // Track allocation with company grouping and consecutive experience handling
    const companyTracks: { [company: string]: number } = {};
    const tracks: { start: number; end: number; companies: Set<string> }[] = [];

    const positionedExperiences = sortedExperiences.map(exp => {
      const startDate = parseDate(exp.startDate);
      const endDate = exp.current ? new Date() : parseDate(exp.endDate);

      const startPos = ((startDate.getFullYear() - earliestDate.getFullYear()) * 12 +
                       (startDate.getMonth() - earliestDate.getMonth())) / totalMonths * 100;
      const endPos = ((endDate.getFullYear() - earliestDate.getFullYear()) * 12 +
                     (endDate.getMonth() - earliestDate.getMonth())) / totalMonths * 100;
      const duration = endPos - startPos;

      let track: number;

      // Check if this company already has a track assigned
      if (companyTracks[exp.company] !== undefined) {
        track = companyTracks[exp.company];
        // Extend the track if this experience goes further
        if (tracks[track] && endPos > tracks[track].end) {
          tracks[track].end = endPos;
        }
      } else {
        // Find available track, considering consecutive experiences as non-overlapping
        track = 0;
        while (track < tracks.length) {
          const trackInfo = tracks[track];

          // Check for true overlap - consecutive experiences should not overlap
          // Allow experiences that start exactly when another ends (or within 1 month tolerance)
          const hasNoOverlap = startPos >= trackInfo.end || endPos <= trackInfo.start;
          const isConsecutiveOrClose = Math.abs(trackInfo.end - startPos) <= 1.0;
          // 1% tolerance for consecutive/close experiences

          if (hasNoOverlap || isConsecutiveOrClose) {
            break;
          }
          track++;
        }

        // Assign track to company
        companyTracks[exp.company] = track;

        if (track >= tracks.length) {
          tracks.push({
            start: startPos,
            end: endPos,
            companies: new Set([exp.company]),
          });
        } else {
          // Update existing track
          tracks[track].start = Math.min(tracks[track].start, startPos);
          tracks[track].end = Math.max(tracks[track].end, endPos);
          tracks[track].companies.add(exp.company);
        }
      }

      return {
        ...exp,
        startPos,
        duration,
        track,
        startDateObj: startDate,
        endDateObj: endDate,
      };
    });

    return { positionedExperiences, totalMonths, earliestDate, latestDate };
  }, [experiences]);

  const TimelineBarComponent: React.FC<TimelineBarProps> = ({
    experience, startPos, duration, track, totalMonths, onClick,
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
            bottom: `${track * 70 + 50}px`,
            // Position relative to bottom to align with timeline axis
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
              whiteSpace: 'nowrap',
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
        label: current.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
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
            with internship experience at leading companies in healthcare, insurance,
            and data analytics.
          </Typography>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography variant="h6">Loading work experience...</Typography>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box sx={{ my: 4, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
              <Typography variant="h6" color="error.dark">Error loading work experience</Typography>
              <Typography variant="body2" color="error.dark">{error}</Typography>
              <Typography variant="body2" color="error.dark" sx={{ mt: 1 }}>
                Backend API is not available. Please ensure the Spring Boot server is
                running on port 8080.
              </Typography>
            </Box>
          )}

          {/* Interactive Timeline Visualization */}
          {!loading && !error && experiences && experiences.length > 0 && (
            <>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                Timeline Overview
                  </Typography>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Interactive horizontal timeline showcasing my professional journey.
              Click on any experience bar to view detailed information in the drilldown panel below.
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
                    height: `${Math.max(
                      timelineData.positionedExperiences.reduce(
                        (max, exp) => Math.max(max, exp.track),
                        0,
                      ) * 70 + 150,
                      200,
                    )}px`,
                  }}
                >
                  <TimelineScrollContainer>
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
                        key={`timeline-label-${label.label}`}
                        sx={{
                          position: 'absolute',
                          bottom: '10px',
                          left: `${label.position}%`,
                          transform: 'translateX(-50%)',
                          fontSize: '0.75rem',
                          color: 'text.secondary',
                          fontWeight: 'bold',
                        }}
                      >
                        {label.label}
                      </Box>
                    ))}
                  </TimelineScrollContainer>
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
                              mr: 1,
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
                          {selectedExperience.location} •
                          {formatDate(selectedExperience.startDate)} -
                          {formatDate(selectedExperience.endDate)}
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
                            <Typography key={`desc-${item.slice(0, 20)}`} variant="body1" component="li" sx={{ mb: 1, lineHeight: 1.6 }}>
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
                              key={`tech-${tech}`}
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
                        {experiences ? experiences.length : 0}
                      </Typography>
                      <Typography variant="body1">
                    Total Experiences
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card elevation={1} sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="primary.main" fontWeight="bold">
                        {experiences ? experiences.filter(exp => exp.type === 'internship').length : 0}
                      </Typography>
                      <Typography variant="body1">
                    Internships Completed
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card elevation={1} sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="primary.main" fontWeight="bold">
                        {experiences
                          ? Array.from(new Set(experiences.flatMap(exp => exp.technologies))).length
                          : 0}
                      </Typography>
                      <Typography variant="body1">
                    Technologies Used
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default WorkExperiencePage;
