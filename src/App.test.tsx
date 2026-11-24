import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
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
});
