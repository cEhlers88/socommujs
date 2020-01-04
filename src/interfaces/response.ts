import IMessage from './message';

export default interface IResponse {
  isResponse: boolean;
  request: IMessage;
  requestId: string;
  response: IMessage & { requestId: string };
}
