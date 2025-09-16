import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import {
  Person as PersonIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';

const AboutPage: React.FC = () => {
  const skills = [
    'Java', 'Python', 'JavaScript', 'TypeScript', 'React', 'Spring Boot',
    'Maven', 'Groovy', 'Jenkins', 'OpenShift', 'Git', 'AWS S3', 'CI/CD',
    'REST APIs', 'Agile/Scrum', 'Unit Testing', 'GitActions', 'Testomat'
  ];

  const interests = [
    'Backend Development', 'Full-Stack Development', 'DevOps', 'Machine Learning',
    'Data Engineering', 'Master Data Management', 'CI/CD Pipelines', 'Software Testing',
    'Agile Development', 'Cloud Platforms'
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mr: 3,
                bgcolor: 'primary.main',
                fontSize: '2rem'
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                About Me
              </Typography>
              <Typography variant="h6" color="text.secondary">
                CS & AI Student at McGill University
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PsychologyIcon sx={{ mr: 1 }} />
                My Story
              </Typography>
              <Typography variant="body1" paragraph>
                I'm Nathan Hu, currently pursuing Computer Science and AI at McGill University.
                I've previously worked as a SWE Intern at PointClickCare and DevOps intern at Intact.
                My interests lie in backend, full stack development, DevOps, and machine learning.
              </Typography>
              <Typography variant="body1" paragraph>
                I'm skilled in multiple programming languages and technologies, including Java, Maven,
                Spring, React, TypeScript, Groovy and familiar with CI/CD pipelines and agile methodologies.
                My experience includes developing REST APIs, creating comprehensive unit tests, building
                CI/CD workflows, and working with cloud platforms like AWS S3.
              </Typography>
              <Typography variant="body1" paragraph>
                In my spare time I'm always eager to learn new things and build impactful projects!
                I'm trilingual, speaking English, French, and Mandarin fluently, and have experience
                working in agile scrum teams on data ingress projects and master data management systems.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <CodeIcon sx={{ mr: 1 }} />
                    Technical Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        variant="outlined"
                        size="small"
                        color="primary"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Areas of Interest
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {interests.map((interest, index) => (
                      <Chip
                        key={index}
                        label={interest}
                        variant="filled"
                        size="small"
                        color="secondary"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Philosophy
            </Typography>
            <Typography variant="body1" fontStyle="italic">
              "I'm always eager to learn new things and build impactful projects!"
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutPage;