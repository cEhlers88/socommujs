import { serverevent } from '../core/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  constructor() {
    super();
  }
  public getListenEvents(): serverevent[] {
    return [serverevent.log];
  }
  public getName(): string {
    throw new Error('Method not implemented.');
  }
  public handleEvent(event: serverevent, eventProps?: unknown): void {
    // console.log(event, eventProps);
  }
  public run(data?: unknown): void {
    throw new Error('Method not implemented.');
  }
}
