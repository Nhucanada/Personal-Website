import React from 'react';
import { experiences } from '../../data/software';
import '../../styles/software.css';

const SoftwareExperiencePage: React.FC = () => {
  return (
    <div className="sw-site">
      <section className="sw-body">
        <div className="sw-section-header">
          <h2 className="sw-section-title">Experience</h2>
          <div className="sw-section-rule" />
        </div>

        <div className="sw-experience-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="sw-experience-item">
              <div className="sw-exp-timeline">
                <div className="sw-exp-dot" />
                <div className="sw-exp-line" />
              </div>
              <div className="sw-exp-content">
                <div className="sw-exp-header">
                  <h3 className="sw-exp-role">{exp.role}</h3>
                  <span className="sw-exp-dates">{exp.dates}</span>
                </div>
                <p className="sw-exp-company">{exp.company} — {exp.location}</p>
                <ul className="sw-exp-bullets">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {exp.tech && exp.tech.length > 0 && (
                  <div className="sw-tech-chips">
                    {exp.tech.map((t) => (
                      <span key={t} className="sw-chip">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SoftwareExperiencePage;
