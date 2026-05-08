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
} from '@mui/material';
import SiteSelectorPage from './pages/SiteSelectorPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import PhotographyAboutPage from './pages/photography/PhotographyAboutPage';
import PhotographyPortfolioPage from './pages/photography/PhotographyPortfolioPage';
import PhotographyWorkCategoryPage from './pages/photography/PhotographyWorkCategoryPage';
import PhotographyContactPage from './pages/photography/PhotographyContactPage';
import PhotographyProjectsPage from './pages/photography/PhotographyProjectsPage';
import PhotographyProjectDetailPage from './pages/photography/PhotographyProjectDetailPage';
import SoftwarePlaceholderPage from './pages/software/SoftwarePlaceholderPage';
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
  const showUnderConstruction =
    process.env.NODE_ENV === 'production'
    && process.env.REACT_APP_SITE_UNDER_CONSTRUCTION === 'true';

  const softwareLayout = (
    <Routes>
      <Route index element={<SoftwarePlaceholderPage />} />
      <Route path="*" element={<SoftwarePlaceholderPage />} />
    </Routes>
  );

  const photographyLayout = (
    <>
      <PhotographyNav />
      <Routes>
        <Route index element={<PhotographyPortfolioPage />} />
        <Route path="work" element={<Navigate to="/photo" replace />} />
        <Route path="work/projects" element={<PhotographyProjectsPage />} />
        <Route path="work/projects/:projectSlug" element={<PhotographyProjectDetailPage />} />
        <Route path="work/:category" element={<PhotographyWorkCategoryPage />} />
        <Route path="portfolio" element={<Navigate to="/photo" replace />} />
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
          <Route path="/" element={showUnderConstruction ? <UnderConstructionPage /> : <SiteSelectorPage />} />
          <Route path="/dev/*" element={softwareLayout} />
          <Route path="/photo/*" element={photographyLayout} />

          {/* Backward-compatible redirects for old software URLs */}
          <Route path="/about" element={<Navigate to="/dev/about" replace />} />
          <Route path="/projects" element={<Navigate to="/dev/projects" replace />} />
          <Route path="/experience" element={<Navigate to="/dev/experience" replace />} />
          <Route path="/education" element={<Navigate to="/dev/education" replace />} />
          <Route path="/ai" element={<Navigate to="/dev/ai" replace />} />
          <Route path="/contact" element={<Navigate to="/dev/contact" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
