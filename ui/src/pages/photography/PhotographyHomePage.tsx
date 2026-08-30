/**
 * PhotographyHomePage.tsx
 *
 * Landing page for the photography section (/photo).
 * Visually mirrors the photography half of the SiteSelectorPage:
 * warm #f6f4ef background, selector-background.jpg centered with
 * object-contain, using the exact same photography.css classes.
 *
 * The PhotographyNav (rendered by App.tsx) provides navigation.
 * "Work" in that nav leads to /photo/work (the portfolio grid).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { getViewerPhotoSrc } from '../../utils/photoOptimization';
import '../../styles/photography.css';

const PhotographyHomePage: React.FC = () => (
  <div className="photo-site site-selector-page">
    <section className="selector-image-wrap">
      <Link to="/photo/work" className="selector-image-link">
        <img
          className="selector-image"
          src={getViewerPhotoSrc('/photos/selector-background.jpg')}
          alt="Photography portfolio"
        />
      </Link>
    </section>
  </div>
);

export default PhotographyHomePage;
