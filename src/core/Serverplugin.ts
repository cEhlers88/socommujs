import Datahandler from "@cehlers88/ceutils/dist/Datahandler";
import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import { ELogLevel, EPluginState, EServerEvent } from './enums';
import { IPlugininfo, IPluginsettingEntry } from './interfaces';
import { getServereventString } from './utils';

export default abstract class Serverplugin {
  protected EvtHandler: Eventhandler | null = null;
  private DataHandler:Datahandler=new Datahandler();
  private settings: IPluginsettingEntry[] = [];
  private state: EPluginState = EPluginState.unknown;

  public readonly log: (logMessage: string, level?: ELogLevel, additionals?: unknown) => void = (
    logMessage: string,
    level?: ELogLevel,
    additionals?: unknown,
  ) => {
    if (!level) {
      level = ELogLevel.debug;
    }
    if (this.EvtHandler) {
      this.EvtHandler.dispatch(getServereventString(EServerEvent.log), { logMessage:'('+this.getName()+')'+logMessage, level, additionals });
    }
  };

  public abstract getListenEvents(): EServerEvent[];
  public readonly getName: () => string = () => {
    return this.DataHandler.getDataSave('name','');
  };
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
  public init(initProps: {
    EventHandler: Eventhandler;
    serverhandle?: {
      getPlugins: () => Serverplugin[];
    };
  }) {
    const self = this;
    this.EvtHandler = initProps.EventHandler;
    return new Promise(() => {
      try {
        [EServerEvent.serverStart, ...self.getListenEvents()].map((event: EServerEvent) => {
          initProps.EventHandler.addListener(getServereventString(event), (props?: unknown) => {
            self.handleEvent(event, props);
          });
        });
      } catch (e) {
        self.log('Error ', ELogLevel.error);
      }
    });
  }
  public setName(newValue: string): Serverplugin {
    this.DataHandler.setData('name',newValue);
    return this;
  }
}
