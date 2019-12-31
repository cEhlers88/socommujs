import {ELogLevel, EServerEvent} from '../core/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('AuthPlugin');
  }
  public getListenEvents(): EServerEvent[] {
    return [EServerEvent.clientWillConnect];
  }
  public handleEvent(event: EServerEvent, eventProps?: any): void {
    switch (event) {
      case EServerEvent.clientWillConnect:
          this.log('test',ELogLevel.debug,this.DataHandler.getData('_Serverdata'));
        break;
    }
  }
  public run(data?: unknown): void {
    let didNothing: boolean = true;
    didNothing = false;
  }
}
