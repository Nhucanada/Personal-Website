import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, profileApi, PhotographyPhoto } from '../../utils/api';
import '../../styles/photography.css';

const heroBackground = `url("${API_BASE_URL}/photos/placeholders/default-placeholder.jpg")`;

const PhotographyHomePage: React.FC = () => {
  const [featuredPhotos, setFeaturedPhotos] = useState<PhotographyPhoto[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const response = await profileApi.getFeaturedPhotos();
      if (response.data) {
        setFeaturedPhotos(response.data.slice(0, 3));
      }
    };

    void fetchFeatured();
  }, []);

  return (
    <div className="photo-site">
      <section className="photo-hero" style={{ backgroundImage: heroBackground }}>
        <div className="photo-hero-content">
          <h1 className="photo-title">Nathan Hu</h1>
        </div>
      </section>

      <section className="photo-body">
        <div className="photo-grid">
          {featuredPhotos.map((photo) => (
            <article className="photo-card" key={photo.id}>
              <img
                className="photo-thumb"
                src={`${API_BASE_URL}${photo.imagePath}`}
                alt={photo.title}
                loading="lazy"
              />
              <div className="photo-meta">
                <h3>{photo.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <Link className="selector-link" to="/photography/portfolio">Portfolio</Link>
      </section>
    </div>
  );
};

export default PhotographyHomePage;
