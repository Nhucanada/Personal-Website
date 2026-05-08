import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WorkCategory, workCategoryOrder, workPhotos } from '../../data/photography';
import '../../styles/photography.css';

const PhotographyWorkCategoryPage: React.FC = () => {
  const { category } = useParams();
  const normalizedCategory = (category || '').toLowerCase();
  const isKnownCategory = workCategoryOrder.includes(normalizedCategory as WorkCategory);
  const categoryPhotos = isKnownCategory
    ? workPhotos.filter((photo) => photo.category === normalizedCategory)
    : [];

  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photo" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        {isKnownCategory && (
          <div className="photo-grid-three">
            {categoryPhotos.map((photo) => (
              <img
                className="photo-thumb-grid-only"
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                key={photo.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PhotographyWorkCategoryPage;
