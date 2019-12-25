import { serverevent } from './enums';

export const getServereventString = (Event: serverevent): string => {
  return serverevent[Event];
  for (let name in serverevent) {
    if (name === '' + Event + '') {
      return serverevent[name];
    }
  }
  /*switch (Event) {
    case serverevent.clientConnected:
      return 'clientConnected';
      break;
    case serverevent.clientDisconnected:
      return 'clientDisconnected';
      break;
    case serverevent.clientWillConnect:
      return 'clientWillConnect';
      break;
    case serverevent.getClientRequest:
      return 'getClientRequest';
      break;
    case serverevent.log:
      return 'log';
      break;
    default:
      return '';
  }*/
};
