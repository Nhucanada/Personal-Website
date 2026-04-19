import React from 'react';
import { API_BASE_URL } from '../../utils/api';
import '../../styles/photography.css';

const PhotographyContactPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section
        className="photo-hero"
        style={{
          backgroundImage: `url("${API_BASE_URL}/photos/placeholders/default-placeholder.jpg")`,
        }}
      >
        <div className="photo-hero-content">
          <h1 className="photo-title">Contact</h1>
        </div>
      </section>

      <section className="photo-body">
        <a className="selector-link-text-only" href="mailto:nhucanada0628@gmail.com">
          nhucanada0628@gmail.com
        </a>
      </section>
    </div>
  );
};

export default PhotographyContactPage;
