import Datahandler from '@cehlers88/ceutils/dist/Datahandler';
import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import * as http from 'http';
import * as websocket from 'websocket';
import { ELogLevel, EServerEvent, EServerState } from '../lib/enums';
import Clientmanager from './Clientmanager';
import { getServereventString } from './utils';
import IServerplugin from "../interfaces/serverplugin";
import Serverplugin from "./Serverplugin";

export default class Server {
  private DataHandler: Datahandler = new Datahandler();
  private isRuningPlugins: boolean = false;
  private runintervalHandle: number | null = null;

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
  public addPlugin(newPlugin: any): Server {
    const self = this;
    const plugins = this.plugins;
    if(!(newPlugin instanceof Serverplugin)){
      throw Error("Invalid plugin");
    }
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
  public close(stopPluginRunInterval: boolean = true) {
    try {
      if (stopPluginRunInterval) {
        this.setRunInterval(null);
      }
      this.DataHandler.getData('_HttpServer').close();
      this.DataHandler.getData('_WebsocketServer').closeAllConnections();
    } catch (e) {
      this.Eventhandler.dispatch('error', e);
    }
  }
  public getPort(): number {
    return this.DataHandler.getDataSave('_port', 2607);
  }
  public getState(): EServerState {
    return this.DataHandler.getDataSave('_state', EServerState.unknown);
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
  public setPort(newValue: number) {
    this.DataHandler.setData('_port', newValue);
  }
  public setRunInterval(newIntervalMs: number | null) {
    if (this.runintervalHandle !== null) {
      clearInterval(this.runintervalHandle);
    }
    if (newIntervalMs !== null && newIntervalMs > 50) {
      setInterval(this._runPlugins.bind(this), newIntervalMs);
    }
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
    if (this.getState() === EServerState.listening && this.isRuningPlugins === false) {
      this.isRuningPlugins = true;
      this.plugins.map(Plugin => Plugin.run());
      this.isRuningPlugins = false;
    }
  }
  private get Eventhandler(): Eventhandler {
    return this.DataHandler.getData('_Eventhandler');
  }
  private get HttpServer(): http.Server {
    return this.DataHandler.getData('_HttpServer');
  }
  private get plugins(): IServerplugin[] {
    return this.DataHandler.getDataSave('_plugins', []);
  }
}
