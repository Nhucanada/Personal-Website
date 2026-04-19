import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import WorkExperiencePage from './pages/WorkExperiencePage';
import EducationPage from './pages/EducationPage';
import ContactPage from './pages/ContactPage';
import AIPage from './pages/AIPage';
import SiteSelectorPage from './pages/SiteSelectorPage';
import PhotographyAboutPage from './pages/photography/PhotographyAboutPage';
import PhotographyPortfolioPage from './pages/photography/PhotographyPortfolioPage';
import PhotographyContactPage from './pages/photography/PhotographyContactPage';
import PhotographyNav from './components/PhotographyNav';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f5d73',
    },
    secondary: {
      main: '#8b6f47',
    },
    background: {
      default: '#f6f4ef',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f1f1f',
      secondary: '#4f4f4f',
    },
  },
  typography: {
    fontFamily: '"Minion Pro", Garamond, "Adobe Garamond Pro", "Times New Roman", serif',
    h1: {
      fontWeight: 600,
      color: '#1f1f1f',
    },
    h2: {
      fontWeight: 600,
      color: '#1f1f1f',
    },
    h3: {
      fontWeight: 600,
      color: '#1f1f1f',
    },
    h4: {
      fontWeight: 600,
      color: '#1f1f1f',
    },
    h5: {
      fontWeight: 600,
      color: '#1f1f1f',
    },
    h6: {
      fontWeight: 600,
      color: '#1f1f1f',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #d8d4cc',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f6f4ef',
          borderBottom: '1px solid #d8d4cc',
          color: '#1f1f1f',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#ece8df',
          color: '#1f1f1f',
        },
      },
    },
  },
});

function App() {
  const softwareLayout = (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header basePath="/software" title="Nathan Hu." homePath="/" />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="experience" element={<WorkExperiencePage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="ai" element={<AIPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Routes>
      </Box>
    </Box>
  );

  const photographyLayout = (
    <>
      <PhotographyNav />
      <Routes>
        <Route index element={<Navigate to="work" replace />} />
        <Route path="work" element={<PhotographyPortfolioPage />} />
        <Route path="portfolio" element={<Navigate to="/photography/work" replace />} />
        <Route path="about" element={<PhotographyAboutPage />} />
        <Route path="contact" element={<PhotographyContactPage />} />
      </Routes>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SiteSelectorPage />} />
          <Route path="/software/*" element={softwareLayout} />
          <Route path="/photography/*" element={photographyLayout} />

          {/* Backward-compatible redirects for old software URLs */}
          <Route path="/about" element={<Navigate to="/software/about" replace />} />
          <Route path="/projects" element={<Navigate to="/software/projects" replace />} />
          <Route path="/experience" element={<Navigate to="/software/experience" replace />} />
          <Route path="/education" element={<Navigate to="/software/education" replace />} />
          <Route path="/ai" element={<Navigate to="/software/ai" replace />} />
          <Route path="/contact" element={<Navigate to="/software/contact" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
