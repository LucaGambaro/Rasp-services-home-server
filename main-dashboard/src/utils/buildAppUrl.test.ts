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

describe('buildAppUrl from an external host', () => {
  it('returns the external url', () => {
    expect(
      buildAppUrl({ protocol: 'https', port: 9443, externalUrl: 'https://portainer.example.com' }, 'home.example.com'),
    ).toBe('https://portainer.example.com');
  });

  it('returns undefined when the app has no external url', () => {
    expect(buildAppUrl({ protocol: 'https', port: 9443 }, 'home.example.com')).toBeUndefined();
  });

  it('ignores the external url on a local host', () => {
    expect(
      buildAppUrl({ protocol: 'https', port: 9443, externalUrl: 'https://portainer.example.com' }, 'home.lan'),
    ).toBe('https://home.lan:9443');
  });
});
