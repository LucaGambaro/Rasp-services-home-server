import { Container, Globe, Weight } from 'lucide-react';
import type { AppLink } from '../types';

// Add a new entry here to get a new button on the dashboard.
export const apps: AppLink[] = [
  {
    id: 'portainer',
    name: 'Portainer',
    description: 'Gestione dei container Docker',
    icon: Container,
    protocol: 'https',
    port: 9443,
    externalUrl: "http://portainer.postgly.cloud"
  },
  {
    id: 'adguard',
    name: 'Ad Guard',
    description: 'DHCP & DNS server',
    icon: Container,
    protocol: 'http',
    port: 8080,
    externalUrl: "https://adguard.postgly.cloud"
  },
  {
    id: 'caddy-site',
    name: 'Sito web',
    description: 'Sito servito da Caddy',
    icon: Globe,
    protocol: 'http',
    port: 80,
  },
  {
    id: 'Ethos',
    name: 'Auto prenotazione Ethos',
    description: 'Prenotazioni palestra',
    icon: Weight,
    protocol: 'http',
    port: 8083,
  },
];
