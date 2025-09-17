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
  CardContent,
} from '@mui/material';
import {
  Person as PersonIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { usePersonalInfo, useSkills } from '../hooks/useProfileData';

const AboutPage: React.FC = () => {
  const { data: personalInfo, loading: personalLoading, error: personalError } = usePersonalInfo();
  const { data: skillsData, loading: skillsLoading, error: skillsError } = useSkills();

  const loading = personalLoading || skillsLoading;
  const error = personalError || skillsError;

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
                fontSize: '2rem',
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                About Me
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {personalInfo?.title || 'CS & AI Student at McGill University'}
              </Typography>
            </Box>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography variant="h6">Loading personal information...</Typography>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box sx={{ my: 4, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
              <Typography variant="h6" color="error.dark">Error loading personal information</Typography>
              <Typography variant="body2" color="error.dark">{error}</Typography>
              <Typography variant="body2" color="error.dark" sx={{ mt: 1 }}>
                Unable to connect to the backend service. Please try again later.
              </Typography>
            </Box>
          )}

          {/* Content */}
          {!loading && !error && personalInfo && (
            <>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <PsychologyIcon sx={{ mr: 1 }} />
                My Story
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {personalInfo.bio}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {personalInfo.description}
                  </Typography>

                  {/* Languages Section */}
                  {personalInfo.languages && personalInfo.languages.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                    Languages
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {personalInfo.languages.map((lang, index) => (
                          <Chip
                            key={`lang-${lang.language}-${lang.proficiency}`}
                            label={`${lang.language} (${lang.proficiency})`}
                            variant="outlined"
                            size="small"
                            color="info"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  {skillsData && (
                    <Card elevation={2} sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <CodeIcon sx={{ mr: 1 }} />
                      Technical Skills
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {skillsData.technicalSkills.map((skill, index) => (
                            <Chip
                              key={`tech-skill-${skill}`}
                              label={skill}
                              variant="outlined"
                              size="small"
                              color="primary"
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  )}

                  {skillsData && skillsData.categories && (
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                      Skill Categories
                        </Typography>
                        {Object.entries(skillsData.categories).map(([category, categorySkills]) => (
                          <Box key={category} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              {category}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                              {categorySkills.map((skill, index) => (
                                <Chip
                                  key={`${category}-skill-${skill}`}
                                  label={skill}
                                  variant="filled"
                                  size="small"
                                  color="secondary"
                                />
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
              Philosophy
                </Typography>
                <Typography variant="body1" fontStyle="italic">
              &quot;I&apos;m always eager to learn new things and build impactful projects!&quot;
                </Typography>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutPage;
