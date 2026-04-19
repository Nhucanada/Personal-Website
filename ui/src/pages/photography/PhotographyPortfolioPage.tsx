import React, { useEffect, useState } from 'react';
import { API_BASE_URL, profileApi, PhotographyPhoto } from '../../utils/api';
import '../../styles/photography.css';

const PhotographyPortfolioPage: React.FC = () => {
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

  return (
    <div className="photo-site">
      <section className="photo-body">
        {!error && (
          <div className="photo-grid-three">
            {photos.map((photo) => (
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
        {error && (
          <div className="photo-grid-three">
            {Array.from({ length: 6 }).map((_, index) => (
              <img
                className="photo-thumb-grid-only"
                src={`${API_BASE_URL}/photos/placeholders/default-placeholder.jpg`}
                alt="placeholder"
                loading="lazy"
                key={`placeholder-${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PhotographyPortfolioPage;
