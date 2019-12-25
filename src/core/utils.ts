import { serverevent } from './enums';

export const getServereventString = (Event: serverevent): string => {
  return serverevent[Event];
  for (let name in serverevent) {
    if (name === '' + Event + '') {
      return serverevent[name];
    }
  }
};
