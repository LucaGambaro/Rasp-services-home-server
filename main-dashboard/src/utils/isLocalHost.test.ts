import { isLocalHost } from './isLocalHost';

describe('isLocalHost', () => {
  it.each(['localhost', '192.168.1.55', '10.0.0.4', '172.16.0.1', '172.31.255.1', '127.0.0.1', 'portainer.lan', 'raspberrypi.local', 'raspberrypi'])(
    'treats %s as local',
    (hostname) => {
      expect(isLocalHost(hostname)).toBe(true);
    },
  );

  it.each(['home.example.com', '8.8.8.8', '172.32.0.1', 'lan.example.com'])('treats %s as external', (hostname) => {
    expect(isLocalHost(hostname)).toBe(false);
  });
});
