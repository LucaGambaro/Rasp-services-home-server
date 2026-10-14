import type { LucideIcon } from 'lucide-react';

export type AppProtocol = 'http' | 'https';

export interface AppLink {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  protocol: AppProtocol;
  port: number;
  // Public URL served through the reverse proxy. Apps without it are hidden when the dashboard is opened from outside the LAN.
  externalUrl?: string;
}
