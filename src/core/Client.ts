import Eventhandler from '@cehlers88/ceutils/dist/Eventhandler';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { ELogLevel } from '../lib/enums';
import IResponse from '../interfaces/response';

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
    if (onOpen) {
      this.EvtHandler.addListener('open', onOpen);
    }
    this.Websocket = new w3cwebsocket('ws://' + this.serverhost + ':' + this.serverport);
    this.Websocket.onopen = () => {
      self.EvtHandler.dispatch('open');
    };
  }
  public send(data: any, destinationClientId: string | null = null) {
    this._socketSend({ ...data, destinationClientId });
  }
  public sendRequest(data: any, responseFunction: CallableFunction) {
    const reqId = Math.random()
      .toString(36)
      .substr(2, 13);
    this.requestsStack.push({ requestId: reqId, callback: responseFunction });
    this._socketSend({ ...data, requestId: reqId });
  }
  public on(eventName: string, callableFunction: CallableFunction) {
    this.EvtHandler.on(eventName, callableFunction);
  }

  private _socketSend(data: any) {
    const valueToSend =
      typeof data === 'string'
        ? data
        : JSON.stringify({
            ...data,
          });
    if (this.Websocket) {
      if (this.Websocket.readyState === 1) {
        this.Websocket.send(valueToSend);
      } else {
        this.connect(this.serverhost, this.serverport, () => {
          const doNothing: boolean = true;
        });
      }
    } else {
      this.EvtHandler.dispatch('log', {
        logLevel: ELogLevel.error,
        logMessage: 'error',
      });
    }
  }
  private _bindEvents() {
    const self = this;
    this.EvtHandler.addListener('open', () => {
      if (self.Websocket) {
        self.Websocket.onmessage = (message: IMessageEvent) => {
          try {
            // @ts-ignore
            const data: IResponse = JSON.parse(message.data);
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
              logLevel: ELogLevel.error,
              logMessage: 'Error',
            });
          }
        };
        self.Websocket.onclose = () => {
          self.EvtHandler.dispatch('close', null);
        };
      }
    });
  }
}
