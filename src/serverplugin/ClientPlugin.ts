import { logLevel, serverevent } from '../core/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('ClientPlugin');
  }
  public getListenEvents(): serverevent[] {
    return [];
  }
  public handleEvent(event: serverevent, eventProps?: unknown): void {
    // test
  }
  public run(data?: unknown): void {
    throw new Error('Method not implemented.');
  }
}
