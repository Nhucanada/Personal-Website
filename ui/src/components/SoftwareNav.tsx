import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sw-nav${scrolled ? ' sw-nav--scrolled' : ''}`}>
      <Link to="/" state={{ from: 'software' }} aria-label="Go back to site selector" className="sw-nav-brand">
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
          href="/documents/Nathan_Hu___Resume_January_2026__CAN.pdf"
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
