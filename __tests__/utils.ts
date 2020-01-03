import { getServereventString } from '../src/core/utils';
import { EServerEvent } from '../src/core/enums';

test('Resolving some serverevent string', () => {
  expect(getServereventString(EServerEvent.getClientRequest)).toBe('getClientRequest');
  expect(getServereventString(EServerEvent.clientDisconnected)).toBe('clientDisconnected');
  expect(getServereventString(EServerEvent.log)).toBe('log');
});
