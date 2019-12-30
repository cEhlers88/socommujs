import { ERequestMessage, EServerEvent } from './enums';

export const getRequestMessageString = (Event: ERequestMessage | string): string => {
  if (typeof Event === 'string') {
    return Event;
  }
  return ERequestMessage[Event];
};

export const getServereventString = (Event: EServerEvent | string): string => {
  if (typeof Event === 'string') {
    return Event;
  }
  return EServerEvent[Event];
};
