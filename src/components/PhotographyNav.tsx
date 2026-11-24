import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFeatureFlags } from '../utils/featureFlags';
import '../styles/photography.css';

const isPathActive = (pathname: string, candidate: string): boolean => {
  if (candidate === '/photo') {
    return pathname === '/photo';
  }
  if (candidate === '/photo/work') {
    return pathname.startsWith('/photo/work');
  }
  return pathname.startsWith(candidate);
};

const PhotographyNav: React.FC = () => {
  const location = useLocation();
  const { selectorEnabled } = getFeatureFlags();

  return (
    <nav className="photo-nav">
      <Link
        to={selectorEnabled ? '/' : '/photo'}
        state={selectorEnabled ? { from: 'photo' } : undefined}
        aria-label={selectorEnabled ? 'Go back to site selector' : undefined}
        className="photo-nav-brand"
      >
        Nathan Hu
      </Link>
      <div className="photo-nav-links">
        <Link
          className={isPathActive(location.pathname, '/photo') ? 'active' : ''}
          to="/photo"
        >
          Home
        </Link>
        <Link
          className={isPathActive(location.pathname, '/photo/work') ? 'active' : ''}
          to="/photo/work"
        >
          Work
        </Link>
        <Link
          className={isPathActive(location.pathname, '/photo/about') ? 'active' : ''}
          to="/photo/about"
        >
          Nathan Who?
        </Link>
        <Link
          className={isPathActive(location.pathname, '/photo/contact') ? 'active' : ''}
          to="/photo/contact"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default PhotographyNav;
