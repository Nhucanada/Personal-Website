import { describe, expect, it } from 'vitest';
import { getOptimizedPhotoSrc, getViewerPhotoSrc } from './photoOptimization';

describe('photoOptimization', () => {
  describe('getOptimizedPhotoSrc', () => {
    it('maps standard /photos/ paths to grid-tier optimized JPEGs', () => {
      expect(getOptimizedPhotoSrc('/photos/Portfolio/AA023.jpg')).toBe(
        '/photos/optimized/Portfolio/AA023.jpg',
      );
    });

    it('handles nested paths with spaces and uppercase extensions', () => {
      expect(getOptimizedPhotoSrc('/photos/Projects/Random ahhh shoot/cover.PNG')).toBe(
        '/photos/optimized/Projects/Random ahhh shoot/cover.jpg',
      );
      expect(getOptimizedPhotoSrc('/photos/Series/Street/DSCN2204.JPG')).toBe(
        '/photos/optimized/Series/Street/DSCN2204.jpg',
      );
    });

    it('returns non-/photos/ URLs unchanged', () => {
      expect(getOptimizedPhotoSrc('https://example.com/photo.png')).toBe(
        'https://example.com/photo.png',
      );
      expect(getOptimizedPhotoSrc('/documents/Nathan_Hu_Resume.pdf')).toBe(
        '/documents/Nathan_Hu_Resume.pdf',
      );
    });
  });

  describe('getViewerPhotoSrc', () => {
    it('maps /photos/ paths to viewer-tier optimized JPEGs', () => {
      expect(getViewerPhotoSrc('/photos/selector-background.jpg')).toBe(
        '/photos/optimized/viewer/selector-background.jpg',
      );
      expect(getViewerPhotoSrc('/photos/Portraits/Studio/R1-02135-0003-Edit-2-2.jpg')).toBe(
        '/photos/optimized/viewer/Portraits/Studio/R1-02135-0003-Edit-2-2.jpg',
      );
    });

    it('returns non-/photos/ URLs unchanged', () => {
      expect(getViewerPhotoSrc('/other/image.jpg')).toBe('/other/image.jpg');
    });
  });
});
