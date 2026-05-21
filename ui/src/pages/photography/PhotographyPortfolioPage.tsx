import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { portfolioPhotos, workCategories } from '../../data/photography';
import '../../styles/photography.css';

const PhotographyPortfolioPage: React.FC = () => {
  const location = useLocation();
  const buildImageViewPath = (src: string, title: string): string => {
    const query = new URLSearchParams({
      src,
      title,
      returnTo: location.pathname,
    });
    return `/photo/image?${query.toString()}`;
  };

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
            <Link
              className="photo-grid-item-link"
              key={photo.src}
              to={buildImageViewPath(photo.src, photo.title)}
            >
              <img
                className="photo-thumb-grid-only"
                src={photo.src}
                alt={photo.title}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhotographyPortfolioPage;
