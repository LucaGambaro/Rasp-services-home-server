import { render, screen, within } from '@testing-library/react';
import { App } from './App';
import { apps } from './config/apps';
import { buildAppUrl } from './utils/buildAppUrl';

const setHostname = (hostname: string) => {
  Object.defineProperty(window, 'location', { value: { ...window.location, hostname }, configurable: true });
};

describe('App', () => {
  const originalLocation = window.location;

  afterEach(() => {
    Object.defineProperty(window, 'location', { value: originalLocation, configurable: true });
  });

  it('renders the title', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Home Server' })).toBeInTheDocument();
  });

  it('renders one link per configured app pointing to the current host', () => {
    setHostname('192.168.1.55');
    render(<App />);

    const nav = screen.getByRole('navigation', { name: 'Applicazioni' });
    const links = within(nav).getAllByRole('link');

    expect(links).toHaveLength(apps.length);
    apps.forEach((app, index) => {
      expect(links[index]).toHaveAttribute('href', buildAppUrl(app, '192.168.1.55'));
    });
  });

  it('renders only the apps with an external url from an external host', () => {
    setHostname('home.example.com');
    render(<App />);

    const exposed = apps.filter((app) => app.externalUrl);
    expect(screen.queryAllByRole('link')).toHaveLength(exposed.length);
  });
});
