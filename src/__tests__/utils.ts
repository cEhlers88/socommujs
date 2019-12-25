import { getServereventString } from '../core/utils';
import { serverevent } from '../core/enums';

test('Resolving some serverevent string', () => {
  expect(getServereventString(serverevent.getClientRequest)).toBe('getClientRequest');
  expect(getServereventString(serverevent.clientDisconnected)).toBe('clientDisconnected');
  expect(getServereventString(serverevent.log)).toBe('log');
});
