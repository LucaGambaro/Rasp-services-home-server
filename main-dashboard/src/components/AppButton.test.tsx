import { render, screen } from '@testing-library/react';
import { Container } from 'lucide-react';
import type { AppLink } from '../types';
import { AppButton } from './AppButton';

const app: AppLink = {
  id: 'portainer',
  name: 'Portainer',
  description: 'Gestione container',
  icon: Container,
  protocol: 'https',
  port: 9443,
};

describe('AppButton', () => {
  it('renders a link to the given href with name and description', () => {
    render(<AppButton app={app} href="https://pi.local:9443" />);

    const link = screen.getByRole('link', { name: /Portainer/ });
    expect(link).toHaveAttribute('href', 'https://pi.local:9443');
    expect(screen.getByText('Gestione container')).toBeInTheDocument();
  });
});
