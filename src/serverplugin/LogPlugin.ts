import { EServerEvent } from '../core/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('LogPlugin');
  }
  public getListenEvents(): EServerEvent[] {
    return [EServerEvent.log];
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
