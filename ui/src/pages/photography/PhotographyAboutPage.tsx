import React from 'react';
import { getOptimizedPhotoSrc } from '../../utils/photoOptimization';
import '../../styles/photography.css';

const PhotographyAboutPage: React.FC = () => {
  return (
    <div className="photo-site">
      <section className="photo-body photo-about-layout">
        <div className="photo-about-image-column">
          <img
            className="photo-about-image"
            src={getOptimizedPhotoSrc('/photos/about-profile.jpg')}
            alt="Nathan Hu portrait"
          />
          <p className="photo-about-credit">Photo by Chelsea Chung-Wing</p>
        </div>
        <div className="photo-about-text-column">
          <p className="photo-about-description">
            Nathan Hu is a photographer from Mississauga, Ontario who currently attends
            McGill University in Montreal, Quebec. He taught himself photography in the
            mid 2010s on his dad&apos;s camera, doing landscape and bird photography
            before becoming a sports photographer for his school&apos;s football team.
          </p>
          <p className="photo-about-description">
            In 2018, he picked up a disposable camera after developing an interest from
            a friend&apos;s instant camera. He began shooting film more consistently
            after being gifted a Pentax MX by his art teacher, permanently switching to
            the medium for personal work in 2021.
          </p>
          <p className="photo-about-description">
            Nathan&apos;s works have been exhibited in numerous exhibitions, including
            the CONTACT Photo Festival and the Memento Slide Exhibit. In 2026, Nathan
            was one of 5 winners of the PPU Photo Exhibition.
          </p>
          <p className="photo-about-description">
            Nathan is the VP Tech and Darkroom of MUPSS, providing cameras and
            maintaining a low cost darkroom for students. He is also the co-president of
            PPU, providing low cost professional photo services for student
            organizations. He is also a moderator of the analog community Toronto Analog
            Friends.
          </p>
          <p className="photo-about-description">
            Nathan currently focuses on portraiture and street photography, with the
            occasional landscape and motorsport photography from his travels. He also
            shoots professionally, specializing in services including sports photography,
            headshots and events.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PhotographyAboutPage;
