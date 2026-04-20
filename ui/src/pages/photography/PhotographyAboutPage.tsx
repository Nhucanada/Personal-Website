import React from 'react';
import '../../styles/photography.css';

const PhotographyAboutPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section className="photo-body photo-about-layout">
        <div className="photo-about-image-column">
          <img
            className="photo-about-image"
            src="/photos/about-profile.jpg"
            alt="Nathan Hu portrait"
          />
        </div>
        <div className="photo-about-text-column">
          <p className="photo-about-description">
            I am Nathan Hu, a software engineering student and photographer drawn to clean,
            intentional composition. My photo work focuses on quiet moments, natural light,
            and visual storytelling with a simple editorial feel.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PhotographyAboutPage;
