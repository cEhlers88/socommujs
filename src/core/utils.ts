import { EServerEvent } from './enums';

export const getServereventString = (Event: EServerEvent | string): string => {
  if (typeof Event === 'string') {
    return Event;
  }
  return EServerEvent[Event];
};
