import { serverevent } from './enums';

export const getServereventString = (Event: serverevent|string): string => {
  if(typeof Event === "string") return Event;
  return serverevent[Event];
};
