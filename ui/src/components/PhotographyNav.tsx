import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/photography.css';

const isPathActive = (pathname: string, candidate: string): boolean => {
  if (candidate === '/photography/work') {
    return pathname.startsWith('/photography/work')
      || pathname.startsWith('/photography/portfolio');
  }

  return pathname.startsWith(candidate);
};

const PhotographyNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="photo-nav">
      <Link to="/" aria-label="Go back to site selector" className="photo-nav-brand">
        Nathan Hu
      </Link>
      <div className="photo-nav-links">
        <Link
          className={isPathActive(location.pathname, '/photography/work') ? 'active' : ''}
          to="/photography/work"
        >
          Work
        </Link>
        <Link
          className={isPathActive(location.pathname, '/photography/about') ? 'active' : ''}
          to="/photography/about"
        >
          About
        </Link>
        <Link
          className={isPathActive(location.pathname, '/photography/contact') ? 'active' : ''}
          to="/photography/contact"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default PhotographyNav;
