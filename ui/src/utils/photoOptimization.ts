export const getOptimizedPhotoSrc = (src: string): string => {
  if (!src.startsWith('/photos/')) {
    return src;
  }

  const relativePath = src.replace('/photos/', '');
  const withoutExtension = relativePath.replace(/\.[^.]+$/, '');
  return `/photos/optimized/${withoutExtension}.webp`;
};
