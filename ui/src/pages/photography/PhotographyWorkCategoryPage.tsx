import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getWorkCategoryBySlug } from '../../data/photography';
import { getOptimizedPhotoSrc } from '../../utils/photoOptimization';
import '../../styles/photography.css';

const PhotographyWorkCategoryPage: React.FC = () => {
  const { category } = useParams();
  const location = useLocation();
  const buildImageViewPath = (src: string, title: string): string => {
    const query = new URLSearchParams({
      src,
      title,
      returnTo: location.pathname,
    });
    return `/photo/image?${query.toString()}`;
  };
  const normalizedCategory = (category || '').toLowerCase();
  const matchedCategory = getWorkCategoryBySlug(normalizedCategory);
  const categoryPhotos = matchedCategory?.photos || [];

  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photo/work" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        {matchedCategory && (
          <div className="photo-grid-three">
            {categoryPhotos.map((photo) => (
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
        )}
      </section>
    </div>
  );
};

export default PhotographyWorkCategoryPage;
