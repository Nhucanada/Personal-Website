import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SoftwareProjectsPage from './SoftwareProjectsPage';
import { projects } from '../../data/software';

describe('SoftwareProjectsPage', () => {
  it('renders all projects by default and filters to featured projects', () => {
    render(<SoftwareProjectsPage />);

    for (const project of projects) {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole('button', { name: /featured/i }));

    for (const project of projects) {
      if (project.featured) {
        expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
      } else {
        expect(screen.queryByRole('heading', { name: project.title })).not.toBeInTheDocument();
      }
    }

    fireEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByRole('heading', { name: 'Guardians of the Hive' })).toBeInTheDocument();
  });
});
