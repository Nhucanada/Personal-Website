import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioPhotos } from '../../data/photography';
import '../../styles/photography.css';

const heroBackground = 'url("/photos/gold-0011.jpg")';

const PhotographyHomePage: React.FC = () => {
  const featuredPhotos = portfolioPhotos.slice(0, 3);

  return (
    <div className="photo-site">
      <section className="photo-hero" style={{ backgroundImage: heroBackground }}>
        <div className="photo-hero-content">
          <h1 className="photo-title">Nathan Hu</h1>
        </div>
      </section>

      <section className="photo-body">
        <div className="photo-grid">
          {featuredPhotos.map((photo) => (
            <article className="photo-card" key={photo.src}>
              <img
                className="photo-thumb"
                src={photo.src}
                alt={photo.title}
                loading="lazy"
              />
              <div className="photo-meta">
                <h3>{photo.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <Link className="selector-link" to="/photo">Portfolio</Link>
      </section>
    </div>
  );
};

export default PhotographyHomePage;
