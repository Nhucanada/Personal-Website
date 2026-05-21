import React from 'react';
import { Link } from 'react-router-dom';
import { photoProjects } from '../../data/photography';
import '../../styles/photography.css';

const PhotographyProjectsPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-grid-three">
          {photoProjects.map((project) => (
            <article className="photo-project-card" key={project.slug}>
              <Link className="photo-project-link" to={`/photo/work/projects/${project.slug}`}>
                <img
                  className="photo-project-cover"
                  src={project.coverSrc}
                  alt={`${project.label} cover`}
                  loading="lazy"
                />
                <div className="photo-project-label">{project.label}</div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhotographyProjectsPage;
