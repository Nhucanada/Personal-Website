import React from 'react';
import { skillGroups } from '../../data/software';
import '../../styles/software.css';

const SoftwareAboutPage: React.FC = () => {
  return (
    <div className="sw-site">
      <section className="sw-body">
        <div className="sw-about-layout">
          <div className="sw-about-bio-column">
            <div className="sw-section-header">
              <h2 className="sw-section-title">About</h2>
              <div className="sw-section-rule" />
            </div>

            <p className="sw-about-bio">
              I&apos;m a Computer Science &amp; Artificial Intelligence student at McGill University
              with a focus on backend systems, full-stack development, and DevOps. I&apos;m drawn to
              clean architecture, rigorous testing, and the kind of tooling that makes teams faster
              without getting in the way.
            </p>
            <p className="sw-about-bio">
              Outside of software I shoot film and digital photography — you can find that side of
              me at the photography section of this site.
            </p>

            <div className="sw-about-detail-list">
              <div className="sw-about-detail-row">
                <span className="sw-about-detail-label">Study</span>
                <span className="sw-about-detail-value">McGill University — B.Sc. Computer Science &amp; AI</span>
              </div>
              <div className="sw-about-detail-row">
                <span className="sw-about-detail-label">Based in</span>
                <span className="sw-about-detail-value">Oakville, Ontario, Canada</span>
              </div>
              <div className="sw-about-detail-row">
                <span className="sw-about-detail-label">Languages</span>
                <span className="sw-about-detail-value">English · French · Mandarin</span>
              </div>
              <div className="sw-about-detail-row">
                <span className="sw-about-detail-label">Résumé</span>
                <span className="sw-about-detail-value">
                  <a
                    href="/documents/Nathan_Hu___Resume_January_2026__CAN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--sw-accent)', textDecoration: 'none' }}
                  >
                    Download PDF ↗
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="sw-skills-column">
            <div className="sw-section-header">
              <h2 className="sw-section-title">Skills</h2>
              <div className="sw-section-rule" />
            </div>
            {skillGroups.map((group) => (
              <div key={group.category}>
                <p className="sw-skill-group-label">{group.category}</p>
                <div className="sw-skill-chips">
                  {group.items.map((item) => (
                    <span key={item} className="sw-skill-chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareAboutPage;
