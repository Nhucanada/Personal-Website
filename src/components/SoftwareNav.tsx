import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFeatureFlags } from '../utils/featureFlags';
import '../styles/software.css';

const isActive = (pathname: string, candidate: string): boolean => {
  if (candidate === '/dev') {
    return pathname === '/dev' || pathname === '/dev/';
  }
  return pathname.startsWith(candidate);
};

const SoftwareNav: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { selectorEnabled } = getFeatureFlags();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sw-nav${scrolled ? ' sw-nav--scrolled' : ''}`}>
      <Link
        to={selectorEnabled ? '/' : '/dev'}
        state={selectorEnabled ? { from: 'software' } : undefined}
        aria-label={selectorEnabled ? 'Go back to site selector' : undefined}
        className="sw-nav-brand"
      >
        Nathan Hu
      </Link>
      <div className="sw-nav-links">
        <Link
          className={isActive(location.pathname, '/dev') ? 'active' : ''}
          to="/dev"
        >
          Home
        </Link>
        <Link
          className={isActive(location.pathname, '/dev/work') ? 'active' : ''}
          to="/dev/work"
        >
          Work
        </Link>
        <Link
          className={isActive(location.pathname, '/dev/projects') ? 'active' : ''}
          to="/dev/projects"
        >
          Projects
        </Link>
        <Link
          className={isActive(location.pathname, '/dev/about') ? 'active' : ''}
          to="/dev/about"
        >
          About
        </Link>
        <Link
          className={isActive(location.pathname, '/dev/contact') ? 'active' : ''}
          to="/dev/contact"
        >
          Contact
        </Link>
        <a
          className="sw-nav-resume-btn"
          href="/documents/Nathan_Hu_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé
        </a>
      </div>
    </nav>
  );
};

export default SoftwareNav;
