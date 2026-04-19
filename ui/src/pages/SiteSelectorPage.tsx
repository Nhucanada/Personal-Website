import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import '../styles/photography.css';

const SiteSelectorPage: React.FC = () => {
  const siteSelectorBackground = [
    API_BASE_URL,
    '/photos/placeholders/default-placeholder.jpg',
  ].join('');

  return (
    <div className="photo-site site-selector-page">
      <nav className="photo-nav selector-nav">
        <Link to="/" aria-label="Home" className="photo-nav-brand">
          Nathan Hu.
        </Link>
        <div className="photo-nav-links">
          <Link to="/software">Software</Link>
          <Link to="/photography">Photography</Link>
        </div>
      </nav>
      <section className="selector-image-wrap">
        <img
          className="selector-image"
          src={siteSelectorBackground}
          alt="Site selection background"
        />
      </section>
    </div>
  );
};

export default SiteSelectorPage;
