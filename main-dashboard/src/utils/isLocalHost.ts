const PRIVATE_IPV4 = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|127\.)/;
const LOCAL_SUFFIXES = ['.lan', '.local'];

// A hostname is local when it is reachable only from the LAN: private IPs, localhost, *.lan, *.local or dotless names.
export const isLocalHost = (hostname: string): boolean =>
  hostname === 'localhost' ||
  PRIVATE_IPV4.test(hostname) ||
  LOCAL_SUFFIXES.some((suffix) => hostname.endsWith(suffix)) ||
  !hostname.includes('.');
