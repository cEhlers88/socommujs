import { serverevent } from '../core/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  public getListenEvents(): serverevent[] {
    return [serverevent.clientWillConnect];
  }
  public handleEvent(event: serverevent, eventProps?: unknown): void {
    switch (event) {
      case serverevent.clientWillConnect:
        break;
    }
  }
  public run(data?: unknown): void {
    throw new Error('Method not implemented.');
  }
}
