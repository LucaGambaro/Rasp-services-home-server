import { buildAppUrl } from './buildAppUrl';

describe('buildAppUrl', () => {
  it('includes a non-default port', () => {
    expect(buildAppUrl({ protocol: 'https', port: 9443 }, 'raspberrypi.local')).toBe('https://raspberrypi.local:9443');
  });

  it('omits the default http port', () => {
    expect(buildAppUrl({ protocol: 'http', port: 80 }, '192.168.1.10')).toBe('http://192.168.1.10');
  });

  it('omits the default https port', () => {
    expect(buildAppUrl({ protocol: 'https', port: 443 }, 'home.lan')).toBe('https://home.lan');
  });

  it('keeps port 80 on https since it is not the https default', () => {
    expect(buildAppUrl({ protocol: 'https', port: 80 }, 'home.lan')).toBe('https://home.lan:80');
  });
});
