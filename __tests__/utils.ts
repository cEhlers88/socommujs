import {getRequestMessageString, getServereventString} from '../src/core/utils';
import {ERequestMessage, EServerEvent} from '../src/lib/enums';

describe('Test utilities',()=>{
  test('Resolving some serverevent string', () => {
    expect(getServereventString(EServerEvent.getClientRequest)).toBe('getClientRequest');
    expect(getServereventString(EServerEvent.clientDisconnected)).toBe('clientDisconnected');
    expect(getServereventString(EServerEvent.log)).toBe('log');
  });

  test('Resolving some requestmessages',()=>{
    expect(getRequestMessageString(ERequestMessage.login)).toBe('login');
  });
});
