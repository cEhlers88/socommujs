import * as http from 'http';
import * as websocket from 'websocket';
import { logLevel, serverstate } from './core/enums';
import Serverplugin from './core/Serverplugin';
import Eventhandler from './Eventhandler';

export default class Server {
  private EvtHandler: Eventhandler = new Eventhandler();
  private HttpServer: http.Server | any;
  private plugins: Serverplugin[] = [];
  private port: number = 2607;
  private state: serverstate = serverstate.unknown;
  private WebsocketServer: websocket.server | any;

  constructor() {
    this._init();
  }
  public getPort(): number {
    return this.port;
  }
  public getState(): serverstate {
    return this.state;
  }
  public addPlugin(newPlugin: Serverplugin): Server {
    this.plugins.push(newPlugin);
    newPlugin.init(this.EvtHandler);
    return this;
  }
  public listen(port?: number) {
    if (
      this.state !== serverstate.unknown &&
      this.state !== serverstate.initialized &&
      this.state !== serverstate.closed
    ) {
      // close active socket
    }
    if (port) {
      this.port = port;
    }
    port = this.port;
    try {
      this.HttpServer.listen(this.port);
      this.state = serverstate.listening;
      this._log('Server startet (' + this.plugins.length + ')', logLevel.info);
    } catch (e) {
      this.state = serverstate.error;
      this._log('Server start failed', logLevel.error, e);
    }
  }

  private _init() {
    this.EvtHandler = new Eventhandler();
    this.HttpServer = http.createServer();
    this.WebsocketServer = new websocket.server({ httpServer: this.HttpServer });
  }
  private _log(logMessage: string, level: logLevel, additionals?: unknown) {
    this.EvtHandler.dispatch('log', { logMessage, logLevel: level, additionals });
  }
  private _runPlugins() {
    if (this.state === serverstate.listening) {
      this.plugins.map(Plugin => Plugin.run());
    }
  }
}
