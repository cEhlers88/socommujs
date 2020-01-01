import Datahandler from '@cehlers88/ceutils/dist/Datahandler';
import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import * as http from 'http';
import * as websocket from 'websocket';
import Clientmanager from './Clientmanager';
import { ELogLevel, EServerEvent, EServerState } from './core/enums';
import Serverplugin from './core/Serverplugin';
import { getServereventString } from './core/utils';

export default class Server {
  private DataHandler: Datahandler = new Datahandler();

  constructor() {
    this.DataHandler.setMultipleData({
      _Clientmanager: new Clientmanager(),
      _Eventhandler: new Eventhandler(),
      _HttpServer: null,
      _WebsocketServer: null,
      _plugins: [],
      _port: 2607,
      _state: EServerState.unknown,
    });
    this._init();
  }
  public addEventListener(event: EServerEvent | string, eventProperties?: any): Server {
    this.Eventhandler.addListener(getServereventString(event), eventProperties);
    return this;
  }
  public addPlugin(newPlugin: Serverplugin): Server {
    const self = this;
    const plugins = this.plugins;
    plugins.push(newPlugin);
    newPlugin.setLogHandle((props: any) => {
      self.Eventhandler.dispatch(getServereventString(EServerEvent.log), props);
    });
    if (newPlugin.getRequiredServerData().length > 0) {
      const Serverdata = {};
      newPlugin.getRequiredServerData().map((Dataname: string) => {
        // @ts-ignore
        Serverdata[Dataname] = this.DataHandler.getDataSave(Dataname, null);
      });
      newPlugin.setData('_Serverdata', Serverdata);
    }
    newPlugin.init();

    this.DataHandler.setData('_plugins', plugins);
    return this;
  }
  public getPort(): number {
    return this.DataHandler.getDataSave('_port', 2607);
  }
  public getState(): EServerState {
    return this.DataHandler.getDataSave('_state', EServerState.unknown);
  }
  public get HttpServer(): http.Server {
    return this.DataHandler.getData('_HttpServer');
  }
  public listen(port?: number) {
    if (
      this.getState() !== EServerState.unknown &&
      this.getState() !== EServerState.initialized &&
      this.getState() !== EServerState.closed
    ) {
      this._init();
    }
    if (port) {
      this.setPort(port);
    }
    port = this.getPort();
    try {
      this.HttpServer.listen(port);
      this.DataHandler.setData('_state', EServerState.listening);
      this.Eventhandler.dispatch(getServereventString(EServerEvent.serverStart));
      this._log('Server startet', ELogLevel.info);
    } catch (e) {
      this.DataHandler.setData('_state', EServerState.error);
      this._log('Server start failed', ELogLevel.error, e);
    }
  }
  public get plugins(): Serverplugin[] {
    return this.DataHandler.getDataSave('_plugins', []);
  }
  public setPort(newValue: number) {
    this.DataHandler.setData('_port', newValue);
  }

  private _init() {
    const self = this;
    const httpServer = http.createServer();
    const WebsocketServer = new websocket.server({ httpServer });
    this.DataHandler.setMultipleData({
      _HttpServer: httpServer,
      _WebsocketServer: WebsocketServer,
    });

    WebsocketServer.on('request', (request: any) => {
      self.Eventhandler.dispatch(getServereventString(EServerEvent.clientWillConnect), request);
    });
    this.DataHandler.setData('_state', EServerState.initialized);
    this.Eventhandler.dispatch(getServereventString(EServerEvent.serverInitialized), null);
  }
  private _log(logMessage: string, level: ELogLevel, additionals?: unknown) {
    this.Eventhandler.dispatch(getServereventString(EServerEvent.log), { logMessage, logLevel: level, additionals });
  }
  private _runPlugins() {
    if (this.getState() === EServerState.listening) {
      this.plugins.map(Plugin => Plugin.run());
    }
  }
  private get Eventhandler(): Eventhandler {
    return this.DataHandler.getData('_Eventhandler');
  }
}
