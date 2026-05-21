import React from 'react';
import { Link } from 'react-router-dom';
import { getOptimizedPhotoSrc } from '../utils/photoOptimization';
import '../styles/photography.css';

const UnderConstructionPage: React.FC = () => {
  const siteSelectorBackground = getOptimizedPhotoSrc('/photos/selector-background.jpg');

  return (
    <div className="photo-site site-selector-page">
      <nav className="photo-nav selector-nav">
        <Link to="/" aria-label="Home" className="photo-nav-brand">
          Nathan Hu
        </Link>
        <div className="photo-nav-links">
          <span className="selector-link-text-only">Under Construction</span>
        </div>
      </nav>
      <section className="selector-image-wrap">
        <img
          className="selector-image"
          src={siteSelectorBackground}
          alt="Site under construction background"
        />
      </section>
    </div>
  );
};

export default UnderConstructionPage;
