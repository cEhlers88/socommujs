import Datahandler from '@cehlers88/ceutils/dist/Datahandler';
import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import { ELogLevel, EPluginState, EServerEvent } from './enums';
import { ILogInfo, IPlugininfo, IPluginsettingEntry } from './interfaces';
import { getServereventString } from './utils';

export default abstract class Serverplugin {
  protected EvtHandler: Eventhandler = new Eventhandler();
  protected DataHandler: Datahandler = new Datahandler();
  private settings: IPluginsettingEntry[] = [];
  private state: EPluginState = EPluginState.unknown;
  private logHandle:CallableFunction|null=null;

  public abstract getListenEvents(): EServerEvent[];
  public readonly getName: () => string = () => {
    return this.DataHandler.getDataSave('name', '');
  };
  public getRequiredServerData():string[]{return ['_Eventhandler'];}
  public abstract handleEvent(event: EServerEvent, eventProps?: unknown): void;
  public abstract run(data?: unknown): void;

  public getDescription(): string {
    return '';
  }
  public getInfo(): IPlugininfo {
    return {
      data: this.DataHandler.getAll(),
      description: this.getDescription(),
      name: this.getName(),
      settings: this.settings,
    };
  }
  public getSettings(): IPluginsettingEntry[] {
    return this.settings;
  }
  public getState(): EPluginState {
    return this.state;
  }
  public init() {
    const self = this;
    return new Promise(() => {
      try {
        [EServerEvent.serverStart, ...self.getListenEvents()].map((event: EServerEvent) => {
          self.DataHandler.getData("_Serverdata")._Eventhandler.addListener(getServereventString(event),(props?:any)=>{
            self.handleEvent(event,props);
          });
        });
      } catch (e) {
        self.log('Error ', ELogLevel.error,e);
      }
    });
  }
  public setData(key:string, value:any):Serverplugin{
    this.DataHandler.setData(key,value);
    return this;
  }
  public setEventListener(newListener:Eventhandler):Serverplugin{
    this.EvtHandler = newListener;
    return this;
  }
  public setName(newValue: string): Serverplugin {
    this.DataHandler.setData('name', newValue);
    return this;
  }
  public readonly setLogHandle = (newHandle:CallableFunction):Serverplugin => {
    this.logHandle=newHandle;
    return this;
  }

  protected readonly log: (logMessage: string, level?: ELogLevel, additionals?: any) => void = (
      logMessage: string,
      level?: ELogLevel,
      additionals?: any,
  ) => {
    if (!level) {
      level = ELogLevel.debug;
    }
    if(this.logHandle){
      this.logHandle({
        additionals,
        level,
        logMessage: '(' + this.getName() + ')' + logMessage,
      });
    }
  };
}
