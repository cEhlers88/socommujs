import {ELogLevel, EServerEvent} from '../core/enums';
import Serverplugin from '../core/Serverplugin';
import {getServereventString} from "../core/utils";

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('LogPlugin');
    this.setSettingValue('Log Debug',true);
    this.setSettingValue('Log Info',true);
  }
  public getListenEvents(): EServerEvent[]|string {
    return "*";
  }
  public handleEvent(event: EServerEvent, eventProps?: unknown): void {
    this.log('Event',ELogLevel.debug,getServereventString(event));
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
