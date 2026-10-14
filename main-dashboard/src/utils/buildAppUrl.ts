import type { AppLink } from '../types';
import { isLocalHost } from './isLocalHost';

const DEFAULT_PORTS: Record<AppLink['protocol'], number> = { http: 80, https: 443 };

// On the LAN apps live on the same host as the dashboard, only the port changes.
// From outside the LAN they are reached through their public URL, if any.
export const buildAppUrl = (
  { protocol, port, externalUrl }: Pick<AppLink, 'protocol' | 'port' | 'externalUrl'>,
  hostname: string,
): string | undefined => {
  if (!isLocalHost(hostname)) {
    return externalUrl;
  }
  const portSuffix = port === DEFAULT_PORTS[protocol] ? '' : `:${port}`;
  return `${protocol}://${hostname}${portSuffix}`;
};
