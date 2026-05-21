import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPhotoProjectBySlug } from '../../data/photography';
import '../../styles/photography.css';

const PhotographyProjectDetailPage: React.FC = () => {
  const { projectSlug } = useParams();
  const location = useLocation();
  const buildImageViewPath = (src: string, title: string): string => {
    const query = new URLSearchParams({
      src,
      title,
      returnTo: location.pathname,
    });
    return `/photo/image?${query.toString()}`;
  };
  const normalizedProjectSlug = (projectSlug || '').toLowerCase();
  const project = getPhotoProjectBySlug(normalizedProjectSlug);

  if (!project) {
    return <Navigate to="/photo/work/projects" replace />;
  }

  return (
    <div className="photo-site">
      <section className="photo-body">
        <div className="photo-work-back-row">
          <Link to="/photo/work/projects" className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            projects
          </Link>
        </div>
        <div className="photo-work-categories">
          <span>{project.label}</span>
        </div>
        <div className="photo-grid-three">
          {project.photos.map((photo) => (
            <Link
              className="photo-grid-item-link"
              key={photo.src}
              to={buildImageViewPath(photo.src, photo.title)}
            >
              <img
                className="photo-thumb-grid-only"
                src={photo.src}
                alt={photo.title}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhotographyProjectDetailPage;
