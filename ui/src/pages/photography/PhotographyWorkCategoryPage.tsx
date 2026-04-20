import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_BASE_URL, profileApi, PhotographyPhoto } from '../../utils/api';
import '../../styles/photography.css';

const allowedCategories = ['studio', 'portraits', 'sports'];

const PhotographyWorkCategoryPage: React.FC = () => {
  const { category } = useParams();
  const [photos, setPhotos] = useState<PhotographyPhoto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await profileApi.getPhotos();

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setPhotos(response.data);
      }
    };

    void fetchPhotos();
  }, []);

  const isKnownCategory = category && allowedCategories.includes(category.toLowerCase());
  const images = !error
    ? photos
    : Array.from({ length: 6 }).map((_, index) => ({
      id: index + 1,
      imagePath: '/photos/placeholders/default-placeholder.jpg',
      title: 'placeholder',
    }));

  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photography/work" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        {isKnownCategory && (
          <div className="photo-grid-three">
            {images.map((photo) => (
              <img
                className="photo-thumb-grid-only"
                src={`${API_BASE_URL}${photo.imagePath}`}
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
