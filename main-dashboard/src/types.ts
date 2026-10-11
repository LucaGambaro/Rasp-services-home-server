import type { LucideIcon } from 'lucide-react';

export type AppProtocol = 'http' | 'https';

export interface AppLink {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  protocol: AppProtocol;
  port: number;
}
