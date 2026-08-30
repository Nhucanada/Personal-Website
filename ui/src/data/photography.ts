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
    photos: [],
  },
  {
    slug: 'series',
    label: 'Series',
    photos: [],
  },
];

export const getWorkCategoryBySlug = (slug: string): WorkCategory | undefined => {
  return workCategories.find((category) => category.slug === slug);
};

export const portraitPhotos: PhotoAsset[] = [
  { title: 'R1-02085-025A-Edit', src: '/photos/Portraits/R1-02085-025A-Edit.jpg' },
  { title: 'R1-02135-0004-Edit-4-3', src: '/photos/Portraits/R1-02135-0004-Edit-4-3.jpg' },
  { title: 'R1-02136-0009-Edit-11', src: '/photos/Portraits/R1-02136-0009-Edit-11.jpg' },
];

export const portraitSubcategories: WorkCategory[] = [
  {
    slug: 'location',
    label: 'Location',
    photos: [
      { title: 'R1-02085-009A-Edit', src: '/photos/Portraits/Location/R1-02085-009A-Edit.jpg' },
      { title: 'R1-02085-025A-Edit', src: '/photos/Portraits/Location/R1-02085-025A-Edit.jpg' },
    ],
  },
  {
    slug: 'studio',
    label: 'Studio',
    photos: [
      { title: 'R1-02135-0003-Edit-2-2', src: '/photos/Portraits/Studio/R1-02135-0003-Edit-2-2.jpg' },
      { title: 'R1-02135-0004-Edit-4-3', src: '/photos/Portraits/Studio/R1-02135-0004-Edit-4-3.jpg' },
      { title: 'R1-02135-0006-8-5', src: '/photos/Portraits/Studio/R1-02135-0006-8-5.jpg' },
      { title: 'R1-02135-0009-11-8', src: '/photos/Portraits/Studio/R1-02135-0009-11-8.jpg' },
      { title: 'R1-02135-0011-13-10', src: '/photos/Portraits/Studio/R1-02135-0011-13-10.jpg' },
      { title: 'R1-02136-0001-Edit-2', src: '/photos/Portraits/Studio/R1-02136-0001-Edit-2.jpg' },
      { title: 'R1-02136-0002-4', src: '/photos/Portraits/Studio/R1-02136-0002-4.jpg' },
      { title: 'R1-02136-0007-9', src: '/photos/Portraits/Studio/R1-02136-0007-9.jpg' },
      { title: 'R1-02136-0008-10', src: '/photos/Portraits/Studio/R1-02136-0008-10.jpg' },
      { title: 'R1-02136-0009-Edit-11', src: '/photos/Portraits/Studio/R1-02136-0009-Edit-11.jpg' },
      { title: 'R1-02139-0007-1', src: '/photos/Portraits/Studio/R1-02139-0007-1.jpg' },
      { title: 'R1-02139-0008-2', src: '/photos/Portraits/Studio/R1-02139-0008-2.jpg' },
      { title: 'R1-02139-0009-3', src: '/photos/Portraits/Studio/R1-02139-0009-3.jpg' },
    ],
  },
];

export const getPortraitSubcategoryBySlug = (slug: string): WorkCategory | undefined => {
  return portraitSubcategories.find((sub) => sub.slug === slug);
};

export const seriesPhotos: PhotoAsset[] = [
  { title: '000278400009-1', src: '/photos/Series/000278400009-1.jpg' },
  { title: 'DSCN2204', src: '/photos/Series/DSCN2204.JPG' },
  { title: '_JJM0711-1', src: '/photos/Series/_JJM0711-1.jpg' },
];

export const seriesSubcategories: WorkCategory[] = [
  {
    slug: 'street',
    label: 'Street',
    photos: [
      { title: 'DSCN2204', src: '/photos/Series/Street/DSCN2204.JPG' },
    ],
  },
  {
    slug: 'motorsport',
    label: 'Motorsport',
    photos: [
      { title: '_JJM0711-1', src: '/photos/Series/Motorsport/_JJM0711-1.jpg' },
    ],
  },
  {
    slug: 'landscape',
    label: 'Landscape',
    photos: [
      { title: '000278400009-1', src: '/photos/Series/Landscape/000278400009-1.jpg' },
    ],
  },
];

export const getSeriesSubcategoryBySlug = (slug: string): WorkCategory | undefined => {
  return seriesSubcategories.find((sub) => sub.slug === slug);
};

export const photoCollections: PhotoProject[] = [
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

export const getPhotoCollectionBySlug = (slug: string): PhotoProject | undefined => {
  return photoCollections.find((collection) => collection.slug === slug);
};

export const photoCommissioned: PhotoProject[] = [
  {
    slug: 'sample-test',
    label: 'SAMPLE TEST',
    coverSrc: '/photos/Commissioned/SAMPLE_TEST/IMG_5968.jpg',
    photos: [
      { title: 'IMG_5968', src: '/photos/Commissioned/SAMPLE_TEST/IMG_5968.jpg' },
      { title: 'IMG_5969', src: '/photos/Commissioned/SAMPLE_TEST/IMG_5969.jpg' },
      { title: 'IMG_5970', src: '/photos/Commissioned/SAMPLE_TEST/IMG_5970.jpg' },
      { title: 'IMG_5971', src: '/photos/Commissioned/SAMPLE_TEST/IMG_5971.jpg' },
    ],
  },
];

export const getCommissionedBySlug = (slug: string): PhotoProject | undefined => {
  return photoCommissioned.find((collection) => collection.slug === slug);
};
