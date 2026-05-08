import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioPhotos, workCategories } from '../../data/photography';
import '../../styles/photography.css';

const PhotographyPortfolioPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-categories">
          <Link to="/photo/work/projects">Projects</Link>
          {workCategories.map((category) => (
            <Link key={category.slug} to={`/photo/work/${category.slug}`}>
              {category.label}
            </Link>
          ))}
        </div>
        <div className="photo-grid-three">
          {portfolioPhotos.map((photo) => (
            <img
              className="photo-thumb-grid-only"
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              key={photo.src}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhotographyPortfolioPage;
