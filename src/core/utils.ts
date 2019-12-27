import { serverevent } from './enums';

export const getServereventString = (Event: serverevent): string => {
  return serverevent[Event];
  for (const name in serverevent) {
    if (name === '' + Event + '') {
      return serverevent[name];
    }
  }
};
