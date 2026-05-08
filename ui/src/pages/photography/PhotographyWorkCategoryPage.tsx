import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getWorkCategoryBySlug } from '../../data/photography';
import '../../styles/photography.css';

const PhotographyWorkCategoryPage: React.FC = () => {
  const { category } = useParams();
  const normalizedCategory = (category || '').toLowerCase();
  const matchedCategory = getWorkCategoryBySlug(normalizedCategory);
  const categoryPhotos = matchedCategory?.photos || [];

  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photo" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        {matchedCategory && (
          <div className="photo-grid-three">
            {categoryPhotos.map((photo) => (
              <img
                className="photo-thumb-grid-only"
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                key={photo.src}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PhotographyWorkCategoryPage;
