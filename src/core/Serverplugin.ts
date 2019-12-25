import Eventhandler from '../Eventhandler';
import { logLevel, pluginstate, serverevent } from './enums';
import { IPlugindataEntry, IPlugininfo, IPluginsettingEntry } from './interfaces';
import { getServereventString } from './utils';

export default abstract class {
  private data: IPlugindataEntry[] = [];
  private settings: IPluginsettingEntry[] = [];
  private state: pluginstate = pluginstate.unknown;

  public readonly log: (logMessage: string, level?: logLevel, additionals?: unknown) => void = (
    logMessage: string,
    level?: logLevel,
    additionals?: unknown,
  ) => {
    if (!level) {
      level = logLevel.debug;
    }
    this.handleEvent(serverevent.log, { logMessage, level, additionals });
  };

  public abstract getListenEvents(): serverevent[];
  public abstract getName(): string;
  public abstract handleEvent(event: serverevent, eventProps?: unknown): void;
  public abstract run(data?: unknown): void;

  public getDescription(): string {
    return '';
  }
  public getInfo(): IPlugininfo {
    return {
      data: this.data,
      description: this.getDescription(),
      name: this.getName(),
      settings: this.settings,
    };
  }
  public getSettings(): IPluginsettingEntry[] {
    return this.settings;
  }
  public getState(): pluginstate {
    return this.state;
  }
  public init(EventHandler: Eventhandler) {
    const self = this;
    return new Promise(() => {
      try {
        self.getListenEvents().map((event: serverevent) => {
          EventHandler.addListener(getServereventString(event), (props?: unknown) => {
            self.handleEvent(event, props);
          });
        });
      } catch (e) {
        self.log('Error ', logLevel.error);
      }
    });
  }
}
