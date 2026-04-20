export type WorkCategory = 'studio' | 'portraits' | 'sports';

export interface WorkPhoto {
  id: number;
  title: string;
  src: string;
  category: WorkCategory;
}

export const workCategoryOrder: WorkCategory[] = ['studio', 'portraits', 'sports'];

export const workPhotos: WorkPhoto[] = [
  { id: 1, title: 'Studio 1', src: '/photos/default-placeholder.jpg', category: 'studio' },
  { id: 2, title: 'Portrait 1', src: '/photos/about-profile.jpg', category: 'portraits' },
  { id: 3, title: 'Sports 1', src: '/photos/gold-0011.jpg', category: 'sports' },
  { id: 4, title: 'Studio 2', src: '/photos/gold-0011.jpg', category: 'studio' },
  { id: 5, title: 'Portrait 2', src: '/photos/default-placeholder.jpg', category: 'portraits' },
  { id: 6, title: 'Sports 2', src: '/photos/about-profile.jpg', category: 'sports' },
  { id: 7, title: 'Studio 3', src: '/photos/about-profile.jpg', category: 'studio' },
  { id: 8, title: 'Portrait 3', src: '/photos/gold-0011.jpg', category: 'portraits' },
  { id: 9, title: 'Sports 3', src: '/photos/default-placeholder.jpg', category: 'sports' },
];
