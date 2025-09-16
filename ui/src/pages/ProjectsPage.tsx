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
  Link
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Code as CodeIcon
} from '@mui/icons-material';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const ProjectsPage: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Personal Website',
      description: 'A full-stack personal portfolio website built with React, TypeScript, and Spring Boot. Features responsive design with Material-UI components, comprehensive test coverage, and Maven build integration.',
      technologies: ['React', 'TypeScript', 'Spring Boot', 'Material-UI', 'Maven', 'Jest', 'React Router'],
      githubUrl: 'https://github.com/Nhucanada/Personal-Website',
      featured: true
    },
    {
      id: 2,
      title: 'Java Search Engine',
      description: 'A comprehensive search engine implementation in Java featuring web crawling, indexing, and ranking algorithms. Includes XML parsing, graph data structures, and efficient search algorithms.',
      technologies: ['Java', 'XML Parsing', 'Data Structures', 'Algorithms', 'Maven'],
      githubUrl: 'https://github.com/Nhucanada/javasearchengine',
      featured: true
    },
    {
      id: 3,
      title: 'Guardians of the Hive',
      description: 'A tower defense game implemented in Java featuring strategic gameplay, multiple bee types with unique abilities, and progressive difficulty levels. Complete with game physics and AI enemy behavior.',
      technologies: ['Java', 'Object-Oriented Programming', 'Game Development', 'Swing GUI'],
      githubUrl: 'https://github.com/Nhucanada/Guardians-of-the-Hive',
      featured: true
    },
    {
      id: 4,
      title: 'Block Painting Game',
      description: 'An interactive puzzle game where players manipulate colored blocks to achieve specific goals. Features multiple game modes, score tracking, and progressive difficulty.',
      technologies: ['Java', 'Swing', 'Game Logic', 'Event Handling'],
      githubUrl: 'https://github.com/Nhucanada/paintinggame',
      featured: false
    },
    {
      id: 5,
      title: 'Solitaire Cipher Implementation',
      description: 'A Java implementation of the Solitaire cipher algorithm for secure message encryption and decryption. Features card deck manipulation and cryptographic operations.',
      technologies: ['Java', 'Cryptography', 'Algorithms', 'Security'],
      githubUrl: 'https://github.com/Nhucanada/solitairecipher',
      featured: false
    },
    {
      id: 6,
      title: 'Data Analysis & Visualization Tools',
      description: 'Collection of shell scripts and tools for data processing, analysis, and visualization. Includes automated reporting and statistical analysis capabilities.',
      technologies: ['Shell Scripting', 'Data Analysis', 'Bash', 'Unix Tools'],
      githubUrl: 'https://github.com/Nhucanada',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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
        </Paper>
      </Box>
    </Container>
  );
};

export default ProjectsPage;