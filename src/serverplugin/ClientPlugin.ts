import { serverevent } from '../core/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  public getListenEvents(): serverevent[] {
    throw new Error('Method not implemented.');
  }
  public getName(): string {
    throw new Error('Method not implemented.');
  }
  public handleEvent(event: serverevent, eventProps?: unknown): void {
    throw new Error('Method not implemented.');
  }
  public run(data?: unknown): void {
    throw new Error('Method not implemented.');
  }
}
