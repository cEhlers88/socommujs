import Datahandler from "@cehlers88/ceutils/dist/Datahandler";
import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import * as http from 'http';
import * as websocket from 'websocket';
import {ELogLevel, EServerEvent, EServerState} from './core/enums';
import Serverplugin from './core/Serverplugin';
import {getServereventString} from './core/utils';

export default class Server {
  private DataHandler: Datahandler = new Datahandler();

  constructor() {
    this.DataHandler.setMultipleData({
      _Eventhandler: new Eventhandler(),
      _HttpServer:null,
      _WebsocketServer:null,
      _port:2607,
      _state:EServerState.unknown
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
    newPlugin.setLogHandle((props:any)=>{
      self.Eventhandler.dispatch(getServereventString(EServerEvent.log),props);
    });
    if(newPlugin.getRequiredServerData().length>0){
      const Serverdata={};
      newPlugin.getRequiredServerData().map((Dataname:string)=>{
        // @ts-ignore
        Serverdata[Dataname] = this.DataHandler.getDataSave(Dataname,null);
      });
      newPlugin.setData("_Serverdata",Serverdata);
    }
    newPlugin.init();

    /*
    newPlugin.init({
      Eventhandler:self.Eventhandler,
      serverhandle: {
        getPlugins: (() => {
          return this.plugins;
        }).bind(this),
      },
    });*/

    this.DataHandler.setData('_plugins',plugins);
    return this;
  }
  public get Eventhandler():Eventhandler{return this.DataHandler.getData('_Eventhandler');}
  public getPort(): number {
    return this.DataHandler.getDataSave('_port',2607);
  }
  public getState(): EServerState {
    return this.DataHandler.getDataSave('_state',EServerState.unknown);
  }
  public get HttpServer():http.Server{return this.DataHandler.getData('_HttpServer');}
  public listen(port?: number) {
    if (
      this.state !== EServerState.unknown &&
      this.state !== EServerState.initialized &&
      this.state !== EServerState.closed
    ) {
      this._init();
    }
    if (port) {
      this.setPort(port);
    }
    port = this.port;
    try {
      this.HttpServer.listen(this.port);
      this.DataHandler.setData('_state', EServerState.listening);
      this.Eventhandler.dispatch(getServereventString(EServerEvent.serverStart));
      this._log('Server startet (' + this.plugins.length + ')', ELogLevel.info);
    } catch (e) {
      this.DataHandler.setData('_state', EServerState.error);
      this._log('Server start failed', ELogLevel.error, e);
    }
  }
  public get plugins():Serverplugin[]{return this.DataHandler.getDataSave('_plugins',[]);}
  public get port():number{return this.DataHandler.getDataSave('_port',2607);}
  public setPort(newValue: number) {
    this.DataHandler.setData('_port',newValue);
  }
  public get state():EServerState{return this.DataHandler.getDataSave('_state',EServerState.unknown);}
  public get WebsocketServer():websocket.server{return this.DataHandler.getData('_WebsocketServer');}

  private _init() {
    const self = this;
    const httpServer = http.createServer();
    this.DataHandler.setMultipleData({
      _HttpServer:httpServer,
      _WebsocketServer:new websocket.server({ httpServer })
    })

    this.WebsocketServer.on('request', (request: any) => {
      self.Eventhandler.dispatch(getServereventString(EServerEvent.clientWillConnect), request);
    });
    this.DataHandler.setData('_state', EServerState.initialized);
    this.Eventhandler.dispatch(getServereventString(EServerEvent.serverInitialized), null);
  }
  private _log(logMessage: string, level: ELogLevel, additionals?: unknown) {
    this.Eventhandler.dispatch(getServereventString(EServerEvent.log), { logMessage, logLevel: level, additionals });
  }
  private _runPlugins() {
    if (this.state === EServerState.listening) {
      this.plugins.map(Plugin => Plugin.run());
    }
  }
}
