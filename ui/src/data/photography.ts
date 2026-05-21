export interface PhotoAsset {
  title: string;
  src: string;
}

export interface WorkCategory {
  slug: string;
  label: string;
  photos: PhotoAsset[];
}

export interface PhotoProject {
  slug: string;
  label: string;
  coverSrc: string;
  photos: PhotoAsset[];
}

export const portfolioPhotos: PhotoAsset[] = [
  { title: '006026640016', src: '/photos/Portfolio/006026640016.jpg' },
  { title: 'AA023', src: '/photos/Portfolio/AA023.jpg' },
  { title: 'FUJI3565', src: '/photos/Portfolio/FUJI3565.jpg' },
  { title: 'McGill-17', src: '/photos/Portfolio/McGill-17.jpg' },
  { title: 'R1-02085-012A', src: '/photos/Portfolio/R1-02085-012A.jpg' },
  { title: 'R1-02136-0009-Edit-11', src: '/photos/Portfolio/R1-02136-0009-Edit-11.jpg' },
  { title: 'R1-02139-0008-2', src: '/photos/Portfolio/R1-02139-0008-2.jpg' },
  { title: 'selector-background', src: '/photos/Portfolio/selector-background.jpg' },
];

export const workCategories: WorkCategory[] = [
  {
    slug: 'polaroids',
    label: 'Polaroids',
    photos: [
      { title: 'chels 2', src: '/photos/Polaroids/chels 2.jpg' },
      { title: 'chels 3', src: '/photos/Polaroids/chels 3.jpg' },
      { title: 'chels 5', src: '/photos/Polaroids/chels 5.jpg' },
      { title: 'chels 6', src: '/photos/Polaroids/chels 6.jpg' },
      { title: 'chels 67', src: '/photos/Polaroids/chels 67.jpg' },
    ],
  },
  {
    slug: 'portraits',
    label: 'Portraits',
    photos: [
      { title: 'R1-02085-009A-Edit', src: '/photos/Portraits/R1-02085-009A-Edit.jpg' },
      { title: 'R1-02085-025A-Edit', src: '/photos/Portraits/R1-02085-025A-Edit.jpg' },
    ],
  },
  {
    slug: 'studio',
    label: 'Studio',
    photos: [
      { title: 'R1-02135-0003-Edit-2-2', src: '/photos/Studio/R1-02135-0003-Edit-2-2.jpg' },
      { title: 'R1-02135-0004-Edit-4-3', src: '/photos/Studio/R1-02135-0004-Edit-4-3.jpg' },
      { title: 'R1-02135-0006-8-5', src: '/photos/Studio/R1-02135-0006-8-5.jpg' },
      { title: 'R1-02135-0009-11-8', src: '/photos/Studio/R1-02135-0009-11-8.jpg' },
      { title: 'R1-02135-0011-13-10', src: '/photos/Studio/R1-02135-0011-13-10.jpg' },
      { title: 'R1-02136-0001-Edit-2', src: '/photos/Studio/R1-02136-0001-Edit-2.jpg' },
      { title: 'R1-02136-0002-4', src: '/photos/Studio/R1-02136-0002-4.jpg' },
      { title: 'R1-02136-0007-9', src: '/photos/Studio/R1-02136-0007-9.jpg' },
      { title: 'R1-02136-0008-10', src: '/photos/Studio/R1-02136-0008-10.jpg' },
      { title: 'R1-02136-0009-Edit-11', src: '/photos/Studio/R1-02136-0009-Edit-11.jpg' },
      { title: 'R1-02139-0007-1', src: '/photos/Studio/R1-02139-0007-1.jpg' },
      { title: 'R1-02139-0008-2', src: '/photos/Studio/R1-02139-0008-2.jpg' },
      { title: 'R1-02139-0009-3', src: '/photos/Studio/R1-02139-0009-3.jpg' },
    ],
  },
];

export const getWorkCategoryBySlug = (slug: string): WorkCategory | undefined => {
  return workCategories.find((category) => category.slug === slug);
};

export const photoProjects: PhotoProject[] = [
  {
    slug: 'random-ahhh-shoot',
    label: 'Random ahhh shoot',
    coverSrc: '/photos/Projects/Random ahhh shoot/cover.jpg',
    photos: [
      { title: 'R1-02085-012A', src: '/photos/Projects/Random ahhh shoot/R1-02085-012A.jpg' },
      { title: 'R1-02085-036A', src: '/photos/Projects/Random ahhh shoot/R1-02085-036A.jpg' },
      { title: 'R1-02135-0003-Edit-2-2', src: '/photos/Projects/Random ahhh shoot/R1-02135-0003-Edit-2-2.jpg' },
      { title: 'R1-02135-0004-Edit-4-3', src: '/photos/Projects/Random ahhh shoot/R1-02135-0004-Edit-4-3.jpg' },
      { title: 'R1-02135-0006-8-5', src: '/photos/Projects/Random ahhh shoot/R1-02135-0006-8-5.jpg' },
      { title: 'R1-02135-0009-11-8', src: '/photos/Projects/Random ahhh shoot/R1-02135-0009-11-8.jpg' },
      { title: 'R1-02135-0011-13-10', src: '/photos/Projects/Random ahhh shoot/R1-02135-0011-13-10.jpg' },
      { title: 'R1-02136-0001-Edit-2', src: '/photos/Projects/Random ahhh shoot/R1-02136-0001-Edit-2.jpg' },
      { title: 'R1-02136-0002-4', src: '/photos/Projects/Random ahhh shoot/R1-02136-0002-4.jpg' },
      { title: 'R1-02136-0007-9', src: '/photos/Projects/Random ahhh shoot/R1-02136-0007-9.jpg' },
      { title: 'R1-02136-0008-10', src: '/photos/Projects/Random ahhh shoot/R1-02136-0008-10.jpg' },
      { title: 'R1-02139-0007-1', src: '/photos/Projects/Random ahhh shoot/R1-02139-0007-1.jpg' },
      { title: 'R1-02139-0008-2', src: '/photos/Projects/Random ahhh shoot/R1-02139-0008-2.jpg' },
      { title: 'R1-02139-0009-3', src: '/photos/Projects/Random ahhh shoot/R1-02139-0009-3.jpg' },
    ],
  },
];

export const getPhotoProjectBySlug = (slug: string): PhotoProject | undefined => {
  return photoProjects.find((project) => project.slug === slug);
};
