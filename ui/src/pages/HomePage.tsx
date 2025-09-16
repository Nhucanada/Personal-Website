import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  ContactMail as ContactIcon,
  Psychology as AIIcon,
  TrendingUp as TrendingIcon,
  AutoAwesome as AutoIcon,
  Engineering as EngineeringIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // AI Development Statistics
  const aiStats = [
    { label: 'Total Lines of Code', value: '6,955', color: 'primary' },
    { label: 'AI Generated', value: '100%', color: 'success' },
    { label: 'Components Created', value: '25+', color: 'info' },
    { label: 'Tests Written', value: '125+', color: 'warning' }
  ];

  // Recent Projects
  const featuredProjects = [
    {
      title: 'Personal Website',
      description: 'Full-stack React & Spring Boot application with AI development tracking',
      technologies: ['React', 'TypeScript', 'Spring Boot'],
      featured: true
    },
    {
      title: 'Java Search Engine',
      description: 'Comprehensive search engine with web crawling and ranking algorithms',
      technologies: ['Java', 'XML Parsing', 'Algorithms'],
      featured: true
    },
    {
      title: 'Guardians of the Hive',
      description: 'Tower defense game with strategic gameplay and AI enemy behavior',
      technologies: ['Java', 'Game Development', 'Swing GUI'],
      featured: true
    }
  ];

  // Work Experience Summary
  const recentExperience = [
    {
      company: 'PointClickCare',
      position: 'SWE Intern',
      period: 'May 2025 - Aug 2025',
      current: false
    },
    {
      company: 'Intact',
      position: 'DevOps I',
      period: 'Jan 2025 - Apr 2025',
      current: false
    },
    {
      company: 'McGill CSUS',
      position: 'Social Media Executive',
      period: 'Apr 2025 - Present',
      current: true
    }
  ];

  // Technical Skills
  const topSkills = [
    'Java', 'Python', 'React', 'TypeScript', 'Spring Boot',
    'Jenkins', 'CI/CD', 'Machine Learning', 'DevOps'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        {/* Hero Section with AI Emphasis */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)',
            color: 'black',
            textAlign: 'center'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                fontSize: '3rem'
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
          </Box>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Nathan Hu
          </Typography>
          <Typography variant="h5" gutterBottom>
            CS & AI Student at McGill University
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Software Engineering Intern | AI-Driven Development Showcase
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AIIcon />}
              onClick={() => navigate('/ai')}
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.3)' }
              }}
            >
              Explore AI Development
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CodeIcon />}
              onClick={() => navigate('/projects')}
              sx={{
                borderColor: 'black',
                color: 'black',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' }
              }}
            >
              View Projects
            </Button>
          </Box>
        </Paper>

        {/* AI Development Showcase - Primary Widget */}
        <Box sx={{ mb: 4 }}>
          <Card elevation={3} sx={{
            border: '2px solid #90caf9',
            background: 'linear-gradient(135deg, #263238 0%, #37474f 100%)'
          }}>
            <CardContent sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AIIcon sx={{ mr: 2, fontSize: '2rem', color: 'primary.main' }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" component="h2" fontWeight="bold">
                    🤖 AI Development Showcase
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Complete website built with Claude Code - 100% AI Generated
                  </Typography>
                </Box>
                <Chip
                  label="Featured"
                  color="primary"
                  variant="filled"
                  icon={<AutoIcon />}
                />
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {aiStats.map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color={`${stat.color}.main`} fontWeight="bold">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="body1" paragraph>
                This entire website represents a comprehensive showcase of AI-driven development.
                From architecture design to testing implementation, every line of code demonstrates
                the capabilities of modern AI in software engineering.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<TrendingIcon />}
                onClick={() => navigate('/ai')}
                fullWidth
              >
                Explore Complete AI Analysis
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Grid container spacing={3}>
          {/* About Me Widget */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h3">
                    About Me
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  Computer Science & AI student at McGill University with hands-on internship
                  experience at PointClickCare, Intact, and 360insights.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Top Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {topSkills.slice(0, 6).map((skill, index) => (
                      <Chip key={index} label={skill} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  "I'm always eager to learn new things and build impactful projects!"
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ArrowIcon />}
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Projects Widget */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h3">
                    Featured Projects
                  </Typography>
                </Box>
                {featuredProjects.map((project, index) => (
                  <Box key={index} sx={{ mb: 2, pb: 1, borderBottom: index < featuredProjects.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {project.technologies.map((tech, idx) => (
                        <Chip key={idx} label={tech} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<GitHubIcon />}
                  onClick={() => navigate('/projects')}
                >
                  View All Projects
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Work Experience Widget */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h3">
                    Work Experience
                  </Typography>
                </Box>
                <List dense>
                  {recentExperience.map((exp, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <EngineeringIcon color={exp.current ? 'success' : 'action'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {exp.position}
                            </Typography>
                            {exp.current && (
                              <Chip label="Current" size="small" color="success" />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="primary.main">
                              {exp.company}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {exp.period}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ArrowIcon />}
                  onClick={() => navigate('/experience')}
                >
                  Full Timeline
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Education Widget */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h3">
                    Education
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    McGill University
                  </Typography>
                  <Typography variant="body1" color="primary.main">
                    Bachelor of Science - Software Engineering
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    2023 - 2027 | Montreal, Quebec
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={40}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      40% Complete (Year 2 of 4)
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  Focus on Computer Science and AI with hands-on experience in software development,
                  algorithms, and machine learning.
                </Typography>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Languages:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <Chip label="English (Native)" size="small" color="success" />
                    <Chip label="French (Native)" size="small" color="success" />
                    <Chip label="Mandarin (Professional)" size="small" color="info" />
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ArrowIcon />}
                  onClick={() => navigate('/education')}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Contact & Quick Links */}
        <Box sx={{ mt: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ContactIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h5" component="h3">
                  Let's Connect
                </Typography>
              </Box>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" paragraph>
                    Interested in discussing opportunities, collaborations, or learning more about
                    AI-driven development? I'd love to connect!
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      startIcon={<LinkedInIcon />}
                      href="https://www.linkedin.com/in/nhucanada/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      href="https://github.com/Nhucanada"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EmailIcon />}
                      onClick={() => navigate('/contact')}
                    >
                      Contact Form
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      🚀 AI Development
                    </Typography>
                    <Typography variant="body2">
                      This entire website showcases the power of AI in modern software development.
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => navigate('/ai')}
                      sx={{ mt: 1 }}
                    >
                      Learn How
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;