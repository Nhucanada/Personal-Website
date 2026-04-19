import React from 'react';
import { API_BASE_URL } from '../../utils/api';
import '../../styles/photography.css';

const PhotographyAboutPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section
        className="photo-hero"
        style={{
          backgroundImage: `url("${API_BASE_URL}/photos/placeholders/default-placeholder.jpg")`,
        }}
      >
        <div className="photo-hero-content">
          <h1 className="photo-title">About</h1>
        </div>
      </section>
    </div>
  );
};

export default PhotographyAboutPage;
