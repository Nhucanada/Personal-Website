import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';
import SiteSelectorPage from './pages/SiteSelectorPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import PhotographyAboutPage from './pages/photography/PhotographyAboutPage';
import PhotographyHomePage from './pages/photography/PhotographyHomePage';
import PhotographyPortfolioPage from './pages/photography/PhotographyPortfolioPage';
import PhotographyWorkCategoryPage from './pages/photography/PhotographyWorkCategoryPage';
import PhotographyContactPage from './pages/photography/PhotographyContactPage';
import PhotographyCollectionsPage from './pages/photography/PhotographyCollectionsPage';
import PhotographyCollectionDetailPage from './pages/photography/PhotographyCollectionDetailPage';
import PhotographyCommissionedPage from './pages/photography/PhotographyCommissionedPage';
import PhotographyCommissionedDetailPage from './pages/photography/PhotographyCommissionedDetailPage';
import PhotographyPeoplePage from './pages/photography/PhotographyPeoplePage';
import PhotographyPeopleSubcategoryPage from './pages/photography/PhotographyPeopleSubcategoryPage';
import PhotographySeriesPage from './pages/photography/PhotographySeriesPage';
import PhotographySeriesSubcategoryPage from './pages/photography/PhotographySeriesSubcategoryPage';
import PhotographyImageViewPage from './pages/photography/PhotographyImageViewPage';
import SoftwareHomePage from './pages/software/SoftwareHomePage';
import SoftwareAboutPage from './pages/software/SoftwareAboutPage';
import SoftwareProjectsPage from './pages/software/SoftwareProjectsPage';
import SoftwareExperiencePage from './pages/software/SoftwareExperiencePage';
import SoftwareContactPage from './pages/software/SoftwareContactPage';
import SoftwareNav from './components/SoftwareNav';
import PhotographyNav from './components/PhotographyNav';

function ProjectSlugRedirect() {
  const { projectSlug } = useParams();
  return <Navigate to={`/photo/work/collections/${projectSlug ?? ''}`} replace />;
}

function CampaignSlugRedirect() {
  const { campaignSlug } = useParams();
  return <Navigate to={`/photo/work/collections/${campaignSlug ?? ''}`} replace />;
}

function PortraitSubcategoryRedirect() {
  const { subcategory } = useParams();
  return <Navigate to={`/photo/work/people/${subcategory ?? ''}`} replace />;
}

export function AppRoutes() {
  const showUnderConstruction =
    import.meta.env.PROD
    && (
      import.meta.env.VITE_SITE_UNDER_CONSTRUCTION === 'true'
      || import.meta.env.REACT_APP_SITE_UNDER_CONSTRUCTION === 'true'
    );

  const softwareLayout = (
    <>
      <SoftwareNav />
      <Routes>
        <Route index element={<SoftwareHomePage />} />
        <Route path="about" element={<SoftwareAboutPage />} />
        <Route path="projects" element={<SoftwareProjectsPage />} />
        <Route path="work" element={<SoftwareExperiencePage />} />
        <Route path="experience" element={<Navigate to="/dev/work" replace />} />
        <Route path="contact" element={<SoftwareContactPage />} />
        <Route path="resume" element={<Navigate to="/dev" replace />} />
        <Route path="*" element={<Navigate to="/dev" replace />} />
      </Routes>
    </>
  );

  const photographyLayout = (
    <>
      <PhotographyNav />
      <Routes>
        <Route index element={<PhotographyHomePage />} />
        <Route path="work" element={<PhotographyPortfolioPage />} />
        <Route path="work/collections" element={<PhotographyCollectionsPage />} />
        <Route path="work/collections/:collectionSlug" element={<PhotographyCollectionDetailPage />} />
        <Route path="work/campaigns" element={<Navigate to="/photo/work/collections" replace />} />
        <Route path="work/campaigns/:campaignSlug" element={<CampaignSlugRedirect />} />
        <Route path="work/projects" element={<Navigate to="/photo/work/collections" replace />} />
        <Route path="work/projects/:projectSlug" element={<ProjectSlugRedirect />} />
        <Route path="work/commissioned" element={<PhotographyCommissionedPage />} />
        <Route path="work/commissioned/:collectionSlug" element={<PhotographyCommissionedDetailPage />} />
        <Route path="work/people" element={<PhotographyPeoplePage />} />
        <Route path="work/people/:subcategory" element={<PhotographyPeopleSubcategoryPage />} />
        <Route path="work/portraits" element={<Navigate to="/photo/work/people" replace />} />
        <Route path="work/portraits/:subcategory" element={<PortraitSubcategoryRedirect />} />
        <Route path="work/series" element={<PhotographySeriesPage />} />
        <Route path="work/series/:subcategory" element={<PhotographySeriesSubcategoryPage />} />
        <Route path="work/:category" element={<PhotographyWorkCategoryPage />} />
        <Route path="portfolio" element={<Navigate to="/photo" replace />} />
        <Route path="image" element={<PhotographyImageViewPage />} />
        <Route path="about" element={<PhotographyAboutPage />} />
        <Route path="contact" element={<PhotographyContactPage />} />
      </Routes>
    </>
  );

  return (
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
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </Router>
  );
}

export default App;
