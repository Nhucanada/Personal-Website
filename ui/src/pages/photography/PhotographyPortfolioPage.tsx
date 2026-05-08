import React from 'react';
import { Link } from 'react-router-dom';
import { workPhotos } from '../../data/photography';
import '../../styles/photography.css';

const PhotographyPortfolioPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-categories">
          <Link to="/photo/work/studio">Studio</Link>
          <Link to="/photo/work/portraits">Portraits</Link>
          <Link to="/photo/work/sports">Sports</Link>
        </div>
        <div className="photo-grid-three">
          {workPhotos.map((photo) => (
            <img
              className="photo-thumb-grid-only"
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              key={photo.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhotographyPortfolioPage;
