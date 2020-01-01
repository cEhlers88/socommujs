import Datahandler from '@cehlers88/ceutils/dist/Datahandler';
import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import { ELogLevel, EPluginState, EServerEvent } from './enums';
import { IPlugininfo, IPluginsettingEntry } from './interfaces';
import { getServereventString } from './utils';

export default abstract class Serverplugin {
  protected EvtHandler: Eventhandler = new Eventhandler();
  protected DataHandler: Datahandler = new Datahandler();
  protected SettingsDataHandler: Datahandler = new Datahandler();
  private state: EPluginState = EPluginState.unknown;
  private logHandle: CallableFunction | null = null;

  public abstract getListenEvents(): EServerEvent[] | string;
  public readonly getName: () => string = () => {
    return this.DataHandler.getDataSave('name', '');
  };
  public getRequiredServerData(): string[] {
    return ['_Eventhandler'];
  }
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
      settings: this.getSettings(),
    };
  }
  public getSetting(name: string): IPluginsettingEntry | undefined {
    return this.SettingsDataHandler.getData(name);
  }
  public getSettingOptions(name: string): string[] | undefined {
    const setting: IPluginsettingEntry | undefined = this.getSetting(name);
    if (setting !== undefined) {
      return setting.options;
    }
    return undefined;
  }
  public getSettings(): IPluginsettingEntry[] {
    return this.SettingsDataHandler.getAll().map(entry => entry.value);
  }
  public getSettingValue(name: string): any {
    const setting: IPluginsettingEntry | undefined = this.getSetting(name);
    if (setting !== undefined) {
      return setting.value;
    }
    return undefined;
  }
  public getState(): EPluginState {
    return this.state;
  }
  public init() {
    const self = this;
    return new Promise(() => {
      try {
        const listenEvents = (() => {
          const eventsRaw = self.getListenEvents();
          let result: EServerEvent[] = [];
          if (typeof eventsRaw === 'string' && eventsRaw === '*') {
            // Todo: do it automatically
            result.push(EServerEvent.clientDisconnected);
            result.push(EServerEvent.clientWillConnect);
            result.push(EServerEvent.clientConnected);
            result.push(EServerEvent.getClientRequest);
            result.push(EServerEvent.getAuthenticatedRequest);
            result.push(EServerEvent.getUnauthenticatedRequest);
            result.push(EServerEvent.serverInitialized);
            result.push(EServerEvent.serverStart);
            result.push(EServerEvent.serverStop);
          } else {
            // @ts-ignore
            result = [EServerEvent.serverStart, ...eventsRaw];
          }
          return result;
        })();
        listenEvents.map((event: EServerEvent) => {
          self.DataHandler.getData('_Serverdata')._Eventhandler.addListener(
            getServereventString(event),
            (props?: any) => {
              self.handleEvent(event, props);
            },
          );
        });
      } catch (e) {
        self.log('Error ', ELogLevel.error, e);
      }
    });
  }
  public setData(key: string, value: any): Serverplugin {
    this.DataHandler.setData(key, value);
    return this;
  }
  public setEventListener(newListener: Eventhandler): Serverplugin {
    this.EvtHandler = newListener;
    return this;
  }
  public setName(newValue: string): Serverplugin {
    this.DataHandler.setData('name', newValue);
    return this;
  }
  public setSettingValue(name: string, newValue: any) {
    const setting = this.getSetting(name);
    if (setting) {
      setting.value = newValue;
      this.SettingsDataHandler.setData(name, setting);
    } else {
      this.SettingsDataHandler.setData(name, { value: newValue, key: name });
    }
  }
  public readonly setLogHandle = (newHandle: CallableFunction): Serverplugin => {
    this.logHandle = newHandle;
    return this;
  };

  protected readonly log: (logMessage: string, level?: ELogLevel, additionals?: any) => void = (
    logMessage: string,
    level?: ELogLevel,
    additionals?: any,
  ) => {
    if (!level) {
      level = ELogLevel.debug;
    }
    if (this.logHandle) {
      this.logHandle({
        additionals,
        level,
        logMessage: '(' + this.getName() + ')' + logMessage,
      });
    }
  };
}
