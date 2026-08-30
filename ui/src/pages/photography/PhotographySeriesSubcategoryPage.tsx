import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSeriesSubcategoryBySlug } from '../../data/photography';
import { getOptimizedPhotoSrc } from '../../utils/photoOptimization';
import '../../styles/photography.css';

const PhotographySeriesSubcategoryPage: React.FC = () => {
  const { subcategory } = useParams();
  const location = useLocation();

  const buildImageViewPath = (src: string, title: string): string => {
    const query = new URLSearchParams({
      src,
      title,
      returnTo: location.pathname,
    });
    return `/photo/image?${query.toString()}`;
  };

  const normalizedSlug = (subcategory || '').toLowerCase();
  const matched = getSeriesSubcategoryBySlug(normalizedSlug);

  if (!matched) {
    return <Navigate to="/photo/work/series" replace />;
  }

  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photo/work/series" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        <div className="photo-work-categories">
          <span>{matched.label}</span>
        </div>
        <div className="photo-grid-three">
          {matched.photos.map((photo) => (
            <Link
              className="photo-grid-item-link"
              key={photo.src}
              to={buildImageViewPath(photo.src, photo.title)}
            >
              <img
                className="photo-thumb-grid-only"
                src={getOptimizedPhotoSrc(photo.src)}
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

export default PhotographySeriesSubcategoryPage;
