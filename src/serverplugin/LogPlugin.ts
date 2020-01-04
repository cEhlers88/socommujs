import Serverplugin from '../core/Serverplugin';
import { getServereventString } from '../core/utils';
import { ELogLevel, EServerEvent } from '../lib/enums';

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('LogPlugin');
    this.setSettingValue('Log Debug', true);
    this.setSettingValue('Log Info', true);
  }
  public getListenEvents(): EServerEvent[] | string {
    return '*';
  }
  public handleEvent(event: EServerEvent, eventProps?: unknown): void {
    switch (event) {
      case EServerEvent.getUnauthenticatedRequest:
        this.log('Event', ELogLevel.debug, eventProps);
      default:
        this.log('Event', ELogLevel.debug, getServereventString(event));
        break;
    }
  }

  public run(data?: unknown): void {
    let didNothing: boolean = true;
    didNothing = false;
  }
}
