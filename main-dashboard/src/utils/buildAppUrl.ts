import type { AppLink } from '../types';

const DEFAULT_PORTS: Record<AppLink['protocol'], number> = { http: 80, https: 443 };

// Apps live on the same host as the dashboard, only the port changes.
export const buildAppUrl = ({ protocol, port }: Pick<AppLink, 'protocol' | 'port'>, hostname: string): string => {
  const portSuffix = port === DEFAULT_PORTS[protocol] ? '' : `:${port}`;
  return `${protocol}://${hostname}${portSuffix}`;
};
