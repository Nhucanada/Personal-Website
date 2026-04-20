import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, profileApi, PhotographyPhoto } from '../../utils/api';
import '../../styles/photography.css';

const mixedPlaceholders = [
  '/photos/placeholders/default-placeholder.jpg',
  '/photos/placeholders/about-profile.jpg',
  '/photos/placeholders/gold-0011.jpg',
];

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
        <div className="photo-work-categories">
          <Link to="/photography/work/studio">Studio</Link>
          <Link to="/photography/work/portraits">Portraits</Link>
          <Link to="/photography/work/sports">Sports</Link>
        </div>
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
                src={`${API_BASE_URL}${mixedPlaceholders[index % mixedPlaceholders.length]}`}
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
