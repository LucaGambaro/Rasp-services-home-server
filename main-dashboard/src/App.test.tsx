import { render, screen, within } from '@testing-library/react';
import { App } from './App';
import { apps } from './config/apps';
import { buildAppUrl } from './utils/buildAppUrl';

describe('App', () => {
  it('renders the title', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Home Server' })).toBeInTheDocument();
  });

  it('renders one link per configured app pointing to the current host', () => {
    render(<App />);

    const nav = screen.getByRole('navigation', { name: 'Applicazioni' });
    const links = within(nav).getAllByRole('link');

    expect(links).toHaveLength(apps.length);
    apps.forEach((app, index) => {
      expect(links[index]).toHaveAttribute('href', buildAppUrl(app, window.location.hostname));
    });
  });
});
