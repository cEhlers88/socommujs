import * as http from 'http';
import * as websocket from 'websocket';
import { logLevel, serverevent, serverstate } from './core/enums';
import Serverplugin from './core/Serverplugin';
import { getServereventString } from './core/utils';
import Eventhandler from './Eventhandler';

export default class Server {
  private EvtHandler: Eventhandler = new Eventhandler();
  private HttpServer: http.Server | any;
  private plugins: Serverplugin[] = [];
  private port: number = 2607;
  private state: serverstate = serverstate.unknown;
  private WebsocketServer: websocket.server | any;

  constructor() {
    this.EvtHandler = new Eventhandler();

    this._init();
  }
  public addEventListener(event: serverevent | string, eventProperties?: any): Server {
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
  public getState(): serverstate {
    return this.state;
  }
  public listen(port?: number) {
    if (
      this.state !== serverstate.unknown &&
      this.state !== serverstate.initialized &&
      this.state !== serverstate.closed
    ) {
      this._init();
    }
    if (port) {
      this.port = port;
    }
    port = this.port;
    try {
      this.HttpServer.listen(this.port);
      this.state = serverstate.listening;
      this.EvtHandler.dispatch(getServereventString(serverevent.serverStart));
      this._log('Server startet (' + this.plugins.length + ')', logLevel.info);
    } catch (e) {
      this.state = serverstate.error;
      this._log('Server start failed', logLevel.error, e);
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
      self.EvtHandler.dispatch(getServereventString(serverevent.clientWillConnect), request);
    });
    this.state = serverstate.initialized;
    this.EvtHandler.dispatch(getServereventString(serverevent.serverInitialized), null);
  }
  private _log(logMessage: string, level: logLevel, additionals?: unknown) {
    this.EvtHandler.dispatch(getServereventString(serverevent.log), { logMessage, logLevel: level, additionals });
  }
  private _runPlugins() {
    if (this.state === serverstate.listening) {
      this.plugins.map(Plugin => Plugin.run());
    }
  }
}
