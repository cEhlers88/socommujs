import {ELogLevel, EServerEvent} from '../core/enums';
import Serverplugin from '../core/Serverplugin';
import {getServereventString} from "../core/utils";

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('LogPlugin');
  }
  public getListenEvents(): EServerEvent[] {
    return [EServerEvent.clientWillConnect];
  }
  public handleEvent(event: EServerEvent, eventProps?: unknown): void {
    this.log('logEvent',ELogLevel.debug,getServereventString(event));
    switch (event) {
      case EServerEvent.clientWillConnect:

        break;
    }
  }
  public run(data?: unknown): void {
    let didNothing: boolean = true;
    didNothing = false;
  }
}
