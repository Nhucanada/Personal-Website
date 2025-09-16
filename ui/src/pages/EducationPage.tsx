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
  Divider
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
  School as SchoolIcon,
  EmojiEvents as AwardIcon,
  MenuBook as BookIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon
} from '@mui/icons-material';

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
  relevantCourses: string[];
  achievements: string[];
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  expiryDate?: string;
}

const EducationPage: React.FC = () => {
  const education: Education[] = [
    {
      id: 1,
      institution: 'McGill University',
      degree: 'Bachelor of Science',
      field: 'Software Engineering',
      location: 'Montreal, Quebec, Canada',
      startDate: '2023-08',
      endDate: '2027-12',
      description: 'Comprehensive Software Engineering program with emphasis on Computer Science and AI. Gaining strong foundation in programming languages, data structures, software engineering principles, and artificial intelligence.',
      relevantCourses: [
        'Data Structures and Algorithms',
        'Object-Oriented Programming',
        'Software Engineering',
        'Computer Science Fundamentals',
        'Artificial Intelligence',
        'Machine Learning',
        'Database Systems',
        'Software Design Patterns',
        'Discrete Mathematics'
      ],
      achievements: [
        'Active member of McGill Computer Science Undergraduate Society',
        'Communications Executive and Social Media Executive roles',
        'Completed multiple software engineering internships',
        'Demonstrated proficiency in Java, Python, TypeScript, and Groovy'
      ]
    },
    {
      id: 2,
      institution: 'Iroquois Ridge High School',
      degree: 'High School Diploma',
      field: 'General Studies',
      location: 'Oakville, Ontario, Canada',
      startDate: '2019-09',
      endDate: '2023-06',
      description: 'Completed high school education with strong academic performance, preparing for university studies in computer science and engineering.',
      relevantCourses: [
        'Advanced Mathematics',
        'Computer Science',
        'Physics',
        'Chemistry',
        'English',
        'French'
      ],
      achievements: [
        'International Finalist',
        '1st Place in DECA Virtual Business Challenge',
        '4th Place Overall Finalist',
        'RCM Level 8 Piano certification'
      ]
    }
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      name: 'RCM Level 8 Piano',
      issuer: 'Royal Conservatory of Music',
      date: '2022-06'
    },
    {
      id: 2,
      name: 'Ignition Hacks 2022 Certificate',
      issuer: 'Ignition Hacks',
      date: '2022-10'
    },
    {
      id: 3,
      name: 'DELF B2',
      issuer: 'DELF (Diplôme d\'Études en Langue Française)',
      date: '2023-05'
    }
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
                            {edu.location} • {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
                                  key={idx}
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
                                <ListItem key={idx} sx={{ py: 0.5 }}>
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
              I'm trilingual, speaking English (Native), French (Native), and Mandarin (Full Professional).
              Currently expanding my technical expertise through hands-on internship experience in
              software engineering, DevOps, and machine learning while pursuing my degree at McGill University.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EducationPage;