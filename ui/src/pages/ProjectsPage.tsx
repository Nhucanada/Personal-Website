import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Link,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { useProjects } from '../hooks/useProfileData';
import { Project } from '../utils/api';

const ProjectsPage: React.FC = () => {
  const { data: projects, loading, error } = useProjects();

  const featuredProjects = projects?.filter(project => project.featured) || [];
  const otherProjects = projects?.filter(project => !project.featured) || [];

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        {project.githubUrl && (
          <Button
            size="small"
            startIcon={<GitHubIcon />}
            component={Link}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Button>
        )}
        {project.liveUrl && (
          <Button
            size="small"
            startIcon={<LaunchIcon />}
            component={Link}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        )}
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <CodeIcon sx={{ mr: 2, fontSize: '2rem', color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              Projects
            </Typography>
          </Box>

          <Typography variant="body1" paragraph color="text.secondary">
            Here's a collection of projects I've worked on, showcasing my skills in full-stack
            development, problem-solving, and technology exploration.
          </Typography>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography variant="h6">Loading projects...</Typography>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box sx={{ my: 4, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
              <Typography variant="h6" color="error.dark">Error loading projects</Typography>
              <Typography variant="body2" color="error.dark">{error}</Typography>
            </Box>
          )}

          {/* Content */}
          {!loading && !error && projects && projects.length > 0 && (
            <>
              {/* Featured Projects */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Featured Projects
                </Typography>
                <Grid container spacing={3}>
                  {featuredProjects.map((project) => (
                    <Grid item xs={12} md={6} key={project.id}>
                      <ProjectCard project={project} />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Other Projects */}
              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Other Projects
                </Typography>
                <Grid container spacing={3}>
                  {otherProjects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                      <ProjectCard project={project} />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
              Want to see more?
                </Typography>
                <Typography variant="body1" paragraph>
              Check out my GitHub profile for more projects and code repositories.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  component={Link}
                  href="https://github.com/Nhucanada"
                  target="_blank"
                  rel="noopener noreferrer"
                >
              View GitHub Profile
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProjectsPage;
