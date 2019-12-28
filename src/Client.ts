import { IMessageEvent, w3cwebsocket } from 'websocket';
import { logLevel } from './core/enums';
import Eventhandler from 'ceutils/dist/Eventhandler';

export default class {
  private Websocket: w3cwebsocket | null = null;
  private EvtHandler: Eventhandler;
  private serverhost: string = '';
  private serverport: number = 2607;
  private requestsStack: Array<{ requestId: string; callback: CallableFunction }> = [];

  constructor() {
    this.Websocket = null;
    this.EvtHandler = new Eventhandler();

    this._bindEvents();
  }

  public connect(host: string | null = null, port: number | null = null, onOpen?: CallableFunction): void {
    const self = this;
    if (this.Websocket && this.Websocket.readyState === 1) {
      this.Websocket.close();
    }
    if (host) {
      this.serverhost = host;
    }
    if (port) {
      this.serverport = port;
    }

    this.Websocket = new w3cwebsocket(this.serverhost + ':' + this.serverport);
    this.Websocket.onopen = () => {
      self.EvtHandler.dispatch('open');
      if (onOpen) {
        onOpen();
      }
    };
  }
  public send(data: any, destinationClientId: string | null = null) {
    this._socketSend({ ...data, destinationClientId });
  }
  public sendRequest(data: any, responseFunction: CallableFunction) {
    const reqId = Math.random()
      .toString(36)
      .substr(2, 9);
    this.requestsStack.push({ requestId: reqId, callback: responseFunction });
    this._socketSend({ ...data, requestId: reqId });
  }
  public on(eventName: string, callableFunction: CallableFunction) {
    this.EvtHandler.addListener(eventName, callableFunction);
  }
  public get Socket(): w3cwebsocket | null {
    return this.Websocket;
  }

  private _socketSend(data: any) {
    const self = this;
    if (this.Websocket) {
      if (this.Websocket.readyState === 1) {
        this.Websocket.send(
          JSON.stringify({
            ...data,
          }),
        );
      } else {
        this.connect(this.serverhost, this.serverport, () => {
          // @ts-ignore
          self._Socket.send(
            JSON.stringify({
              ...data,
            }),
          );
        });
      }
    } else {
      this.EvtHandler.dispatch('log', {
        logLevel: logLevel.error,
        logMessage: 'error',
      });
    }
  }
  private _bindEvents() {
    const self = this;
    this.EvtHandler.addListener('open', () => {
      if (self.Socket) {
        self.Socket.onmessage = (message: IMessageEvent) => {
          try {
            // @ts-ignore
            const data = JSON.parse(message.data);
            if (data.isResponse && data.isResponse === true) {
              self.requestsStack = self.requestsStack.filter(stackItem => {
                let keep = true;
                if (stackItem.requestId === data.requestId) {
                  // @ts-ignore
                  stackItem.callback(data.response);
                  keep = false;
                }
                return keep;
              });
            } else {
              self.EvtHandler.dispatch('message', message.data);
            }
          } catch (e) {
            self.EvtHandler.dispatch('log', {
              logLevel: logLevel.error,
              logMessage: 'Error',
            });
          }
        };
        self.Socket.onclose = () => {
          self.EvtHandler.dispatch('close', null);
        };
      }
    });
  }
}
