import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from './App';

vi.mock('./components/SoftwareThreeScene', () => ({
  default: () => <div data-testid="three-scene-mock" />,
}));

function renderAtRoute(route: string) {
  return render(
    <MemoryRouter
      initialEntries={[route]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('AppRoutes', () => {
  it('renders the split-screen SiteSelectorPage at /', async () => {
    renderAtRoute('/');
    expect(await screen.findByTestId('three-scene-mock')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Nathan Who?' })).toHaveAttribute(
      'href',
      '/photo/about',
    );
    expect(
      screen.getByRole('link', { name: /go to photography portfolio/i, hidden: true }),
    ).toHaveAttribute('href', '/photo');
    expect(
      screen.getByRole('link', { name: /go to software portfolio/i, hidden: true }),
    ).toHaveAttribute('href', '/dev');
  });

  it('renders the software home page at /dev', async () => {
    renderAtRoute('/dev');
    expect(await screen.findByTestId('three-scene-mock')).toBeInTheDocument();
    expect(
      screen.getByText(/Software Engineer · Computer Science & AI @ McGill/i),
    ).toBeInTheDocument();
  });

  it('renders software experience at /dev/work and redirects /dev/experience', () => {
    renderAtRoute('/dev/experience');
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument();
    expect(screen.getAllByText(/PointClickCare/i).length).toBeGreaterThan(0);
  });

  it('redirects legacy root software URLs (/about -> /dev/about)', () => {
    renderAtRoute('/about');
    expect(screen.getByRole('heading', { name: /^about$/i })).toBeInTheDocument();
    expect(
      screen.getByText(/McGill University — B\.Sc\. Computer Science & AI/i),
    ).toBeInTheDocument();
  });

  it('renders photography portfolio categories at /photo/work', () => {
    renderAtRoute('/photo/work');
    expect(screen.getByRole('link', { name: 'Collections' })).toHaveAttribute(
      'href',
      '/photo/work/collections',
    );
    expect(screen.getByRole('link', { name: 'Commissioned' })).toHaveAttribute(
      'href',
      '/photo/work/commissioned',
    );
    expect(screen.getByRole('link', { name: 'People' })).toHaveAttribute(
      'href',
      '/photo/work/people',
    );
  });

  it('redirects legacy /photo/work/portraits/:subcategory to /photo/work/people/:subcategory', () => {
    renderAtRoute('/photo/work/portraits/studio');
    expect(screen.getByText('Studio')).toBeInTheDocument();
  });

  it('returns to returnTo route when Escape is pressed on the full-screen photo viewer', () => {
    renderAtRoute(
      '/photo/image?src=%2Fphotos%2FPortfolio%2FAA023.jpg&title=AA023&returnTo=%2Fphoto%2Fwork',
    );
    expect(screen.getByRole('img', { name: 'AA023' })).toHaveAttribute(
      'src',
      '/photos/optimized/viewer/Portfolio/AA023.jpg',
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('link', { name: 'Collections' })).toBeInTheDocument();
  });

  describe('production feature flags', () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('redirects / and /dev/* to /photo in prod when VITE_SWE_UNDER_CONSTRUCTION=true', () => {
      vi.stubEnv('PROD', true);
      vi.stubEnv('VITE_SWE_UNDER_CONSTRUCTION', 'true');

      const { unmount } = renderAtRoute('/');
      expect(screen.getByRole('img', { name: 'Photography portfolio' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Nathan Hu' })).toHaveAttribute('href', '/photo');
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/photo');
      unmount();

      renderAtRoute('/dev/projects');
      expect(screen.getByRole('img', { name: 'Photography portfolio' })).toBeInTheDocument();
    });

    it('redirects / and /photo/* to /dev in prod when VITE_PHOTO_UNDER_CONSTRUCTION=true', async () => {
      vi.stubEnv('PROD', true);
      vi.stubEnv('VITE_PHOTO_UNDER_CONSTRUCTION', 'true');

      renderAtRoute('/photo/work');
      expect(await screen.findByTestId('three-scene-mock')).toBeInTheDocument();
      expect(
        screen.getByText(/Software Engineer · Computer Science & AI @ McGill/i),
      ).toBeInTheDocument();
    });

    it('shows UnderConstructionPage and redirects section routes to / when VITE_SITE_UNDER_CONSTRUCTION=true in prod', () => {
      vi.stubEnv('PROD', true);
      vi.stubEnv('VITE_SITE_UNDER_CONSTRUCTION', 'true');

      renderAtRoute('/dev');
      expect(screen.getByText('Under Construction')).toBeInTheDocument();
      expect(
        screen.getByRole('img', { name: 'Site under construction background' }),
      ).toBeInTheDocument();
    });
  });
});
