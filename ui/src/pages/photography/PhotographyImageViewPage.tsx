import React from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getViewerPhotoSrc } from '../../utils/photoOptimization';
import '../../styles/photography.css';

const PhotographyImageViewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const src = searchParams.get('src');
  const title = searchParams.get('title') || 'Photo';
  const returnTo = searchParams.get('returnTo') || '/photo';
  const viewerSrc = src ? getViewerPhotoSrc(src) : null;

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!src) {
    return <Navigate to="/photo" replace />;
  }

  return (
    <div className="photo-site photo-image-view-page">
      <section className="photo-image-view-container">
        <div className="photo-work-back-row">
          <Link to={returnTo} className="photo-back-link">
            <ArrowBackIcon fontSize="small" />
            back
          </Link>
        </div>
        <img className="photo-image-view-full" src={viewerSrc ?? undefined} alt={title} />
      </section>
    </div>
  );
};

export default PhotographyImageViewPage;
