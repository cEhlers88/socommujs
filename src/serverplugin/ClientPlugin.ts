import { ELogLevel, EServerEvent } from '../lib/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('ClientPlugin');
  }
  public getListenEvents(): EServerEvent[] {
    return [];
  }
  public handleEvent(event: EServerEvent, eventProps?: unknown): void {
    let didNothing: boolean = true;
    didNothing = false;
  }
  public run(data?: unknown): void {
    let didNothing: boolean = true;
    didNothing = false;
  }
}
