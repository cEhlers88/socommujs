import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import { logLevel, pluginstate, serverevent } from './enums';
import { IPlugindataEntry, IPlugininfo, IPluginsettingEntry } from './interfaces';
import { getServereventString } from './utils';

export default abstract class Serverplugin {
  protected EvtHandler: Eventhandler | null = null;
  private data: IPlugindataEntry[] = [{ name: '_name', value: '' }];
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
    if (this.EvtHandler) {
      this.EvtHandler.dispatch(getServereventString(serverevent.log), { logMessage, level, additionals });
    }
  };

  public abstract getListenEvents(): serverevent[];
  public readonly getName: () => string = () => {
    const entry = this.data.find((Entry: IPlugindataEntry) => Entry.name === '_name');
    if (entry && entry.value !== '') {
      return entry.value;
    } else {
      return '!-]?[-!';
    }
  };
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
        [serverevent.serverStart, ...self.getListenEvents()].map((event: serverevent) => {
          initProps.EventHandler.addListener(getServereventString(event), (props?: unknown) => {
            self.handleEvent(event, props);
          });
        });
      } catch (e) {
        self.log('Error ', logLevel.error);
      }
    });
  }
  public setName(newValue: string): Serverplugin {
    for (const entry of this.data) {
      if (entry.name === '_name') {
        entry.value = newValue;
      }
    }
    return this;
  }
}
