import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { photoCommissioned } from '../../data/photography';
import { getOptimizedPhotoSrc } from '../../utils/photoOptimization';
import '../../styles/photography.css';

const PhotographyCommissionedPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photo/work" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        <div className="photo-grid-three">
          {photoCommissioned.map((collection) => (
            <article className="photo-project-card" key={collection.slug}>
              <Link className="photo-project-link" to={`/photo/work/commissioned/${collection.slug}`}>
                <img
                  className="photo-project-cover"
                  src={getOptimizedPhotoSrc(collection.coverSrc)}
                  alt={`${collection.label} cover`}
                  loading="lazy"
                />
                <div className="photo-project-label">{collection.label}</div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhotographyCommissionedPage;
