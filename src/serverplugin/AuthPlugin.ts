import { IDataEntry } from '@cehlers88/ceutils/dist/interfaces';
import Clientmanager from '../core/Clientmanager';
import Serverplugin from '../core/Serverplugin';
import { getServereventString } from '../core/utils';
import IClientinfo from '../interfaces/clientinfo';
import IMessage from '../interfaces/message';
import IResponse from "../interfaces/response";
import { ELogLevel, EServerEvent } from '../lib/enums';
import { Authenticate, UserExist, Version } from '../lib/requestMessages';

export default class extends Serverplugin {
  constructor() {
    super();
    this.setName('AuthPlugin');
  }
  public checkLogin(username: string, password: string): boolean {
    return true;
  }
  public get Clientmanager(): Clientmanager {
    return this.DataHandler.getData('_Serverdata')._Clientmanager;
  }
  public getListenEvents(): EServerEvent[] {
    return [EServerEvent.clientWillConnect, EServerEvent.getClientRequest];
  }
  public getRequiredServerData(): string[] {
    return [...super.getRequiredServerData(), '_Clientmanager', '_Eventhandler'];
  }
  public handleEvent(event: EServerEvent, eventProps?: any): void {
    const self = this;
    switch (event) {
      case EServerEvent.clientWillConnect:
        const newClient = this.Clientmanager.createClient();
        this.Clientmanager.addClient(newClient);
        newClient.Connection = eventProps.accept();
        newClient.messageHandle = (request: any) => {
          try {
            const dataRaw = JSON.parse(request.utf8Data);
            self.DataHandler.getData('_Serverdata')._Eventhandler.dispatch(
              getServereventString(EServerEvent.getUnauthenticatedRequest),
              dataRaw,
            );
            if (!self.handleUnauthorizedMessage(dataRaw, newClient)) {
              self.log('Unknown clientMessage', ELogLevel.warning, dataRaw);
            }
          } catch (e) {
            self.log('Error reading clientMessage', ELogLevel.error, e.message);
          }
        };
        newClient.Connection.on('close', () => {
          self.Clientmanager.removeClient(newClient.id);
          self.DataHandler.getData('_Serverdata')._Eventhandler.dispatch(
            getServereventString(EServerEvent.clientDisconnected),
            newClient,
          );
          self.log('Client disconnected', ELogLevel.debug, newClient);
        });
        newClient.Connection.on('message', (request: any) => {
          newClient.messageHandle(request);
        });
        break;
    }
  }
  public handleUnauthorizedMessage(message: IMessage, client: IClientinfo): boolean {
    const self = this;
    switch (message.message) {
      case Authenticate:
        let username: string = '';
        let password: string = '';
        // @ts-ignore
        message.data.map((Data: IDataEntry) => {
          username = Data.key === 'username' ? Data.value : username;
          password = Data.key === 'password' ? Data.value : password;
        });
        if (this.checkLogin(username, password)) {
          client.messageHandle = (request: any) => {
            self.DataHandler.getData('_Serverdata')._Eventhandler.dispatch(
              getServereventString(EServerEvent.getAuthenticatedRequest),
              JSON.parse(request.utf8Data),
            );
          };
          const response: IResponse = {
            isResponse: true,
            request: message,
            requestId: message.requestId ? message.requestId : '',
            response: {
              data: [{ key: 'result', value: true }],
              message: '',
              requestId: message.requestId ? message.requestId : '',
            },
          };
          client.Connection.send(JSON.stringify(response));
          self.log('send response');
        }
        break;
      case UserExist:
        break;
      case Version:
        break;
      default:
        this.log('HandleUnauthorized', ELogLevel.warning, message);
        return false;
    }
    return true;
  }
  public run(data?: unknown): void {
    let didNothing: boolean = true;
    didNothing = false;
  }
}
