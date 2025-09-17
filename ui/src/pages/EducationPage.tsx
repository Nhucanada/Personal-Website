import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  School as SchoolIcon,
  EmojiEvents as AwardIcon,
  MenuBook as BookIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useEducation } from '../hooks/useProfileData';

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  expiryDate?: string;
}

const EducationPage: React.FC = () => {
  const { data: education, loading, error } = useEducation();

  const certifications: Certification[] = [
    {
      id: 1,
      name: 'RCM Level 8 Piano',
      issuer: 'Royal Conservatory of Music',
      date: '2022-06',
    },
    {
      id: 2,
      name: 'Ignition Hacks 2022 Certificate',
      issuer: 'Ignition Hacks',
      date: '2022-10',
    },
    {
      id: 3,
      name: 'DELF B2',
      issuer: 'DELF (Diplôme d\'Études en Langue Française)',
      date: '2023-05',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <SchoolIcon sx={{ mr: 2, fontSize: '2rem', color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              Education & Certifications
            </Typography>
          </Box>

          <Typography variant="body1" paragraph color="text.secondary">
            My educational background and professional certifications that have shaped my
            technical expertise and career development.
          </Typography>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography variant="h6">Loading education information...</Typography>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box sx={{ my: 4, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
              <Typography variant="h6" color="error.dark">Error loading education information</Typography>
              <Typography variant="body2" color="error.dark">{error}</Typography>
              <Typography variant="body2" color="error.dark" sx={{ mt: 1 }}>
                Unable to connect to the backend service. Please try again later.
              </Typography>
            </Box>
          )}

          {/* Content */}
          {!loading && !error && education && education.length > 0 && (
            <>
              {/* Education Section */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Education
                </Typography>
                <Timeline position="alternate">
                  {education.map((edu, index) => (
                    <TimelineItem key={edu.id}>
                      <TimelineSeparator>
                        <TimelineDot color="primary">
                          <SchoolIcon />
                        </TimelineDot>
                        {index < education.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Card elevation={2} sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="h6" component="h3">
                                {edu.degree} in {edu.field}
                              </Typography>
                              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                                {edu.institution}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {edu.location} • {formatDate(edu.startDate)} -
                                {formatDate(edu.endDate)}
                                {edu.gpa && (
                                  <Chip
                                    label={`GPA: ${edu.gpa}`}
                                    size="small"
                                    color="success"
                                    sx={{ ml: 1 }}
                                  />
                                )}
                              </Typography>
                            </Box>

                            <Typography variant="body2" paragraph>
                              {edu.description}
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                  <BookIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                              Relevant Courses
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                                  {edu.relevantCourses.map((course, idx) => (
                                    <Chip
                                      key={`course-${course}`}
                                      label={course}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ))}
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                  <AwardIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                              Achievements
                                </Typography>
                                <List dense>
                                  {edu.achievements.map((achievement, idx) => (
                                    <ListItem
                                      key={`achievement-${achievement.slice(0, 20)}`}
                                      sx={{ py: 0.5 }}
                                    >
                                      <ListItemIcon sx={{ minWidth: 24 }}>
                                        <StarIcon fontSize="small" color="primary" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={achievement}
                                        primaryTypographyProps={{ variant: 'body2' }}
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Certifications Section */}
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Professional Certifications
                </Typography>
                <Grid container spacing={3}>
                  {certifications.map((cert) => (
                    <Grid item xs={12} md={6} key={cert.id}>
                      <Card elevation={2} sx={{ height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CheckIcon color="success" sx={{ mr: 1 }} />
                            <Typography variant="h6" component="h3">
                              {cert.name}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle1" color="primary" gutterBottom>
                            {cert.issuer}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                        Issued: {formatDate(cert.date)}
                            {cert.expiryDate && (
                              <span> • Expires: {formatDate(cert.expiryDate)}</span>
                            )}
                          </Typography>
                          {cert.credentialId && (
                            <Typography variant="caption" color="text.secondary">
                          Credential ID: {cert.credentialId}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ mt: 4, p: 3, bgcolor: 'info.50', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
              Languages & Skills
                </Typography>
                <Typography variant="body1">
              I&apos;m trilingual, speaking English (Native), French (Native),
              and Mandarin (Full Professional).
              Currently expanding my technical expertise through hands-on internship
              experience in
              software engineering, DevOps, and machine learning while pursuing my degree
              at McGill University.
                </Typography>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default EducationPage;
