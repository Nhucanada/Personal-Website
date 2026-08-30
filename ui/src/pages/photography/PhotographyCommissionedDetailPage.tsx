import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getCommissionedBySlug } from '../../data/photography';
import { getOptimizedPhotoSrc } from '../../utils/photoOptimization';
import '../../styles/photography.css';

const PhotographyCommissionedDetailPage: React.FC = () => {
  const { collectionSlug } = useParams();
  const location = useLocation();

  const buildImageViewPath = (src: string, title: string): string => {
    const query = new URLSearchParams({
      src,
      title,
      returnTo: location.pathname,
    });
    return `/photo/image?${query.toString()}`;
  };

  const normalizedSlug = (collectionSlug || '').toLowerCase();
  const collection = getCommissionedBySlug(normalizedSlug);

  if (!collection) {
    return <Navigate to="/photo/work/commissioned" replace />;
  }

  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photo/work/commissioned" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        <div className="photo-work-categories">
          <span>{collection.label}</span>
        </div>
        <div className="photo-grid-three">
          {collection.photos.map((photo) => (
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

export default PhotographyCommissionedDetailPage;
