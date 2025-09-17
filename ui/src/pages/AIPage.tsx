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
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Link,
} from '@mui/material';
import {
  Psychology as AIIcon,
  Code as CodeIcon,
  Description as DocsIcon,
  BugReport as TestIcon,
  ExpandMore as ExpandMoreIcon,
  AutoAwesome as AutoIcon,
  Engineering as EngineeringIcon,
} from '@mui/icons-material';

interface AIMetric {
  category: string;
  totalLines: number;
  aiLines: number;
  percentage: number;
  description: string;
}

interface AIFeature {
  title: string;
  description: string;
  technologies: string[];
  linesOfCode: number;
  complexity: 'Low' | 'Medium' | 'High';
}

const AIPage: React.FC = () => {
  const aiMetrics: AIMetric[] = [
    {
      category: 'Frontend (UI)',
      totalLines: 5031,
      aiLines: 5031,
      percentage: 100,
      description: 'Complete React TypeScript frontend with Material-UI dark theme, interactive timeline visualization, dashboard design, routing, and comprehensive testing',
    },
    {
      category: 'Backend (API)',
      totalLines: 644,
      aiLines: 644,
      percentage: 100,
      description: 'Spring Boot REST API with controllers, services, integration tests, and comprehensive test coverage. Includes JaCoCo code coverage (96% instruction coverage) and Checkstyle quality enforcement.',
    },
    {
      category: 'Build & Config',
      totalLines: 394,
      aiLines: 394,
      percentage: 100,
      description: 'Maven configuration with JaCoCo and Checkstyle plugins, package.json, TypeScript config, custom checkstyle.xml rules, and optimized build pipeline with automated quality checks.',
    },
    {
      category: 'Documentation',
      totalLines: 1419,
      aiLines: 1419,
      percentage: 100,
      description: 'Comprehensive README files, AI contribution tracking, testing guides, and development documentation',
    },
  ];

  const totalLines = aiMetrics.reduce((sum, metric) => sum + metric.totalLines, 0);
  const totalAILines = aiMetrics.reduce((sum, metric) => sum + metric.aiLines, 0);
  const overallPercentage = Math.round((totalAILines / totalLines) * 100);

  const keyFeatures: AIFeature[] = [
    {
      title: 'Interactive Timeline Visualization',
      description: 'Advanced timeline component for overlapping work experiences with interactive selection, tooltips, and responsive design',
      technologies: ['React 18', 'TypeScript', 'Material-UI v5', 'Styled Components', 'Interactive UI'],
      linesOfCode: 827,
      complexity: 'High',
    },
    {
      title: 'Dark Theme Portfolio Design',
      description: 'Complete UI/UX design with Material-UI dark theme, dashboard architecture, responsive navigation, and accessibility features',
      technologies: ['React 18', 'TypeScript', 'Material-UI v5', 'Dark Theme', 'Emotion CSS-in-JS'],
      linesOfCode: 1847,
      complexity: 'High',
    },
    {
      title: 'Professional Content Integration',
      description: 'LinkedIn PDF parsing and integration of real internship experience and personal information',
      technologies: ['PDF Processing', 'Data Extraction', 'Content Management'],
      linesOfCode: 856,
      complexity: 'Medium',
    },
    {
      title: 'Comprehensive Testing Suite',
      description: '115+ tests across frontend and backend with unit, integration, component, and theme testing',
      technologies: ['Jest', 'React Testing Library', 'JUnit', 'Mockito', 'Theme Testing'],
      linesOfCode: 1253,
      complexity: 'High',
    },
    {
      title: 'Full-Stack Architecture',
      description: 'Maven multi-module project with Spring Boot backend and React frontend integration',
      technologies: ['Maven', 'Spring Boot 2.7', 'React Router', 'REST APIs'],
      linesOfCode: 644,
      complexity: 'High',
    },
    {
      title: 'Code Quality Infrastructure',
      description: 'JaCoCo code coverage analysis (96% instruction coverage), Checkstyle enforcement, and comprehensive quality metrics',
      technologies: ['JaCoCo 0.8.8', 'Checkstyle 3.2.0', 'Maven Surefire', 'Quality Assurance'],
      linesOfCode: 241,
      complexity: 'High',
    },
    {
      title: 'Build System Optimization',
      description: 'Frontend-maven-plugin integration, Node.js version fixes, and CI/CD ready configuration with automated quality checks',
      technologies: ['Maven', 'Node.js 18+', 'npm', 'Build Optimization'],
      linesOfCode: 103,
      complexity: 'Medium',
    },
    {
      title: 'Documentation Excellence',
      description: 'Detailed README files, AI contribution tracking, testing guides, and development workflows',
      technologies: ['Markdown', 'Technical Writing', 'AI Tracking', 'API Documentation'],
      linesOfCode: 1419,
      complexity: 'Medium',
    },
  ];

  const aiCapabilities = [
    'Complete project architecture design and implementation',
    'Real-time problem solving and debugging (Node.js compatibility, TypeScript errors)',
    'Dark theme design and Material-UI component customization',
    'Comprehensive testing strategy development and execution (125+ tests)',
    'Professional UI/UX design with accessibility compliance',
    'Dashboard architecture with widget-based layout design',
    'Integration of external data sources (LinkedIn PDF parsing)',
    'Code quality infrastructure implementation (96% test coverage, Checkstyle enforcement)',
    'Technical documentation and development workflow creation',
    'Build system optimization and configuration management',
    'Automated quality assurance and best practices implementation',
  ];

  const technicalDecisions = [
    { decision: 'React 18 + TypeScript', rationale: 'Type safety and modern React features' },
    { decision: 'Material-UI v5 Dark Theme', rationale: 'Professional design system with custom dark color palette' },
    { decision: 'Dashboard Architecture', rationale: 'Widget-based homepage showcasing all sections with AI emphasis' },
    { decision: 'Spring Boot 2.7', rationale: 'Robust REST API framework with minimal configuration' },
    { decision: 'Maven Multi-Module', rationale: 'Separation of concerns and build integration' },
    { decision: 'JaCoCo Code Coverage', rationale: '96% instruction coverage with automated reporting and quality gates' },
    { decision: 'Checkstyle Quality Enforcement', rationale: 'Consistent code style and best practices across Java codebase' },
    { decision: 'Comprehensive Testing', rationale: 'Theme testing, integration testing, and type-safe test patterns' },
    { decision: 'Frontend-Maven-Plugin', rationale: 'Unified build process for full-stack project' },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'info';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <AIIcon sx={{ mr: 2, fontSize: '2rem', color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              AI Development Showcase
            </Typography>
          </Box>

          <Typography variant="body1" paragraph color="text.secondary">
            This page details the comprehensive AI contribution to Nathan Hu's personal website,
            showcasing how Claude Code (Anthropic's AI assistant) built a complete full-stack
            application from requirements to deployment.
          </Typography>

          {/* Overall Statistics */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              AI Contribution Statistics
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Total Project: {totalLines.toLocaleString()} lines of code
              </Typography>
              <Typography variant="body1">
                <strong>{overallPercentage}% AI Generated</strong> • {totalAILines.toLocaleString()} lines written by AI
              </Typography>
            </Alert>

            <Grid container spacing={3}>
              {aiMetrics.map((metric, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card elevation={2}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {metric.category}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={metric.percentage}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {metric.aiLines.toLocaleString()} / {metric.totalLines.toLocaleString()} lines
                          </Typography>
                          <Typography variant="body2" color="primary.main" fontWeight="bold">
                            {metric.percentage}% AI
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {metric.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Key Features Developed */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              AI-Developed Features
            </Typography>
            <Grid container spacing={3}>
              {keyFeatures.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EngineeringIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6" component="h3">
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" paragraph color="text.secondary">
                        {feature.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={`${feature.linesOfCode} lines`}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                          label={feature.complexity}
                          size="small"
                          color={getComplexityColor(feature.complexity) as any}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {feature.technologies.map((tech, idx) => (
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
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* AI Capabilities Demonstrated */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              AI Capabilities Demonstrated
            </Typography>
            <Card elevation={2}>
              <CardContent>
                <List>
                  {aiCapabilities.map((capability, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <AutoIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={capability} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>

          {/* Technical Decisions */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              AI Technical Decisions
            </Typography>
            <Grid container spacing={2}>
              {technicalDecisions.map((decision, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">
                        {decision.decision}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {decision.rationale}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Development Process */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              AI Development Methodology
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ textAlign: 'center', p: 2 }}>
                  <CodeIcon sx={{ fontSize: '3rem', color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Iterative Development
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Built features incrementally with testing and validation at each step
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ textAlign: 'center', p: 2 }}>
                  <TestIcon sx={{ fontSize: '3rem', color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Test-Driven Approach
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created comprehensive test suites alongside functionality development
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ textAlign: 'center', p: 2 }}>
                  <DocsIcon sx={{ fontSize: '3rem', color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Documentation-First
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maintained detailed documentation throughout the development process
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Problem Solving Examples */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              AI Problem-Solving Examples
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Maven Build Compatibility Issues
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Problem:</strong> Build failure due to Node.js version incompatibility in frontend-maven-plugin.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>AI Solution:</strong> Diagnosed the issue by analyzing error logs, identified the version mismatch,
                  and updated ui/pom.xml to use Node.js v18.19.0 and npm v10.2.3, ensuring compatibility with
                  package.json engine requirements.
                </Typography>
                <Typography variant="body2">
                  <strong>Result:</strong> Successful Maven build integration and CI/CD ready configuration.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Material-UI Timeline Component Import Error
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Problem:</strong> Timeline components were imported from @mui/material but are actually located in @mui/lab.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>AI Solution:</strong> Identified the correct import location, added @mui/lab dependency to package.json,
                  and updated import statements in WorkExperiencePage.tsx and EducationPage.tsx.
                </Typography>
                <Typography variant="body2">
                  <strong>Result:</strong> Functional timeline components with proper Material-UI integration.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  LinkedIn Profile Data Integration
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Challenge:</strong> Extract and integrate real professional information from PDF format.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>AI Solution:</strong> Parsed LinkedIn PDF content, extracted relevant information including
                  internship experience, education details, and contact information, then updated all pages
                  to reflect accurate personal and professional data.
                </Typography>
                <Typography variant="body2">
                  <strong>Result:</strong> Authentic portfolio website with real internship experience at PointClickCare,
                  Intact, and 360insights, plus accurate education information from McGill University.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Resources */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'info.50', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              AI Development Resources
            </Typography>
            <Typography variant="body1" paragraph>
              This project demonstrates the capabilities of Claude Code (Anthropic's AI assistant) in full-stack
              web development. For detailed contribution tracking and methodology, see:
            </Typography>
            <Typography variant="body2">
              <Link href="/AI_CONTRIBUTIONS.md" target="_blank" rel="noopener noreferrer">
                📄 AI_CONTRIBUTIONS.md - Detailed tracking document
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AIPage;
