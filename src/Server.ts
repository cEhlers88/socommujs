import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import * as http from 'http';
import * as websocket from 'websocket';
import { ELogLevel, EServerEvent, EServerState } from './core/enums';
import Serverplugin from './core/Serverplugin';
import { getServereventString } from './core/utils';

export default class Server {
  private EvtHandler: Eventhandler = new Eventhandler();
  private HttpServer: http.Server | any;
  private plugins: Serverplugin[] = [];
  private port: number = 2607;
  private state: EServerState = EServerState.unknown;
  private WebsocketServer: websocket.server | any;

  constructor() {
    this.EvtHandler = new Eventhandler();

    this._init();
  }
  public addEventListener(event: EServerEvent | string, eventProperties?: any): Server {
    this.EvtHandler.addListener(getServereventString(event), eventProperties);
    return this;
  }
  public addPlugin(newPlugin: Serverplugin): Server {
    this.plugins.push(newPlugin);
    newPlugin.init({
      EventHandler: this.EvtHandler,
      serverhandle: {
        getPlugins: (() => {
          return this.plugins;
        }).bind(this),
      },
    });
    return this;
  }
  public getPort(): number {
    return this.port;
  }
  public getState(): EServerState {
    return this.state;
  }
  public listen(port?: number) {
    if (
      this.state !== EServerState.unknown &&
      this.state !== EServerState.initialized &&
      this.state !== EServerState.closed
    ) {
      this._init();
    }
    if (port) {
      this.port = port;
    }
    port = this.port;
    try {
      this.HttpServer.listen(this.port);
      this.state = EServerState.listening;
      this.EvtHandler.dispatch(getServereventString(EServerEvent.serverStart));
      this._log('Server startet (' + this.plugins.length + ')', ELogLevel.info);
    } catch (e) {
      this.state = EServerState.error;
      this._log('Server start failed', ELogLevel.error, e);
    }
  }
  public setPort(newValue: number) {
    this.port = newValue;
  }

  private _init() {
    const self = this;
    this.HttpServer = http.createServer();
    this.WebsocketServer = new websocket.server({ httpServer: this.HttpServer });

    this.WebsocketServer.on('request', (request: any) => {
      self.EvtHandler.dispatch(getServereventString(EServerEvent.clientWillConnect), request);
    });
    this.state = EServerState.initialized;
    this.EvtHandler.dispatch(getServereventString(EServerEvent.serverInitialized), null);
  }
  private _log(logMessage: string, level: ELogLevel, additionals?: unknown) {
    this.EvtHandler.dispatch(getServereventString(EServerEvent.log), { logMessage, logLevel: level, additionals });
  }
  private _runPlugins() {
    if (this.state === EServerState.listening) {
      this.plugins.map(Plugin => Plugin.run());
    }
  }
}
