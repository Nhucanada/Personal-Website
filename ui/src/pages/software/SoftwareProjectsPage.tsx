import React, { useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { projects } from '../../data/software';
import '../../styles/software.css';

type Filter = 'all' | 'featured';

const SoftwareProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'featured'
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <div className="sw-site">
      <section className="sw-body">
        <div className="sw-section-header">
          <h2 className="sw-section-title">Projects</h2>
          <div className="sw-section-rule" />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          {(['all', 'featured'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'var(--sw-accent-dim)' : 'transparent',
                border: `1px solid ${filter === f ? 'rgba(100,212,232,0.45)' : 'var(--sw-border)'}`,
                borderRadius: '3px',
                color: filter === f ? 'var(--sw-accent)' : 'var(--sw-text-muted)',
                fontFamily: 'var(--sw-font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.3rem 0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="sw-project-grid">
          {visible.map((project) => (
            <article key={project.id} className="sw-project-card">
              <div className="sw-project-card-header">
                <h3 className="sw-project-title">{project.title}</h3>
                <div className="sw-project-links">
                  {project.github && (
                    <a
                      className="sw-icon-link"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                    >
                      <GitHubIcon fontSize="small" />
                    </a>
                  )}
                  {project.url && (
                    <a
                      className="sw-icon-link"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </a>
                  )}
                </div>
              </div>
              <p className="sw-project-desc">{project.description}</p>
              <div className="sw-tech-chips">
                {project.tech.map((t) => (
                  <span key={t} className="sw-chip">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SoftwareProjectsPage;
