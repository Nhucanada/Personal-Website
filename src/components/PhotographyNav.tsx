import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  return (
    <nav className="photo-nav">
      <Link to="/" state={{ from: 'photo' }} aria-label="Go back to site selector" className="photo-nav-brand">
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
