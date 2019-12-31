import {ELogLevel, EServerEvent} from '../core/enums';
import Serverplugin from '../core/Serverplugin';
import Clientmanager from "../Clientmanager";

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('AuthPlugin');
  }
  public checkLogin(username:string, password:string):boolean {return true;}
  public get Clientmanager():Clientmanager{return this.DataHandler.getData('_Serverdata')._Clientmanager;}
  public getListenEvents(): EServerEvent[] {
    return [
        EServerEvent.clientWillConnect,
        EServerEvent.getClientRequest
    ];
  }
  public getRequiredServerData(): string[] {
    return [...super.getRequiredServerData(),
      "_Clientmanager"
    ];
  }
  public handleEvent(event: EServerEvent, eventProps?: any): void {
    switch (event) {
      case EServerEvent.clientWillConnect:
          const newClient = this.Clientmanager.createClient();
          newClient.Connection = eventProps.accept();
          //this.log('test',ELogLevel.info,'ok');
        break;
    }
  }
  public run(data?: unknown): void {
    let didNothing: boolean = true;
    didNothing = false;
  }
}
