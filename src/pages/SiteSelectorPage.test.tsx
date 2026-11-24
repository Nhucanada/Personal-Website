import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import SiteSelectorPage from './SiteSelectorPage';

vi.mock('../components/SoftwareThreeScene', () => ({
  default: () => <div data-testid="three-scene-mock" />,
}));

describe('SiteSelectorPage', () => {
  it('renders both photography and software layers with viewer-tier selector image', async () => {
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SiteSelectorPage />
      </MemoryRouter>,
    );

    expect(await screen.findByTestId('three-scene-mock')).toBeInTheDocument();

    const selectorImg = container.querySelector('.sel-photo-image') as HTMLImageElement | null;
    expect(selectorImg).not.toBeNull();
    expect(selectorImg?.getAttribute('src')).toBe(
      '/photos/optimized/viewer/selector-background.jpg',
    );

    expect(screen.getByRole('link', { name: 'Nathan Who?' })).toHaveAttribute(
      'href',
      '/photo/about',
    );
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/dev/projects',
    );
    expect(screen.getByRole('link', { name: 'Résumé' })).toHaveAttribute(
      'href',
      '/documents/Nathan_Hu_Resume.pdf',
    );
  });
});
