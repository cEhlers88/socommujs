import { EServerEvent } from '../core/enums';
import Serverplugin from '../core/Serverplugin';

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('AuthPlugin');
  }
  public getListenEvents(): EServerEvent[] {
    return [EServerEvent.clientWillConnect];
  }
  public handleEvent(event: EServerEvent, eventProps?: unknown): void {
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
