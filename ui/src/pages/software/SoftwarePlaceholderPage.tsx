import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/photography.css';

const SoftwarePlaceholderPage: React.FC = () => {
  return (
    <div className="photo-site">
      <nav className="photo-nav">
        <Link to="/" aria-label="Go back to site selector" className="photo-nav-brand">
          Nathan Hu
        </Link>
        <div className="photo-nav-links">
          <Link className="active" to="/dev">Software</Link>
        </div>
      </nav>

      <section className="photo-body software-placeholder-layout">
        <p className="photo-eyebrow">Work in progress</p>
        <h1 className="photo-title">Software Portfolio</h1>
        <p className="photo-about-description">
          This section is currently being rebuilt. A refreshed software engineering portfolio is
          on the way.
        </p>
        <div className="software-resume-frame">
          <iframe
            className="software-resume-embed"
            title="Nathan Hu Resume"
            src="/documents/Nathan_Hu___Resume_January_2026__CAN.pdf"
          />
        </div>
      </section>
    </div>
  );
};

export default SoftwarePlaceholderPage;
