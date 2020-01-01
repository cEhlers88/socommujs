import { IDataEntry } from '@cehlers88/ceutils/dist/interfaces';
import {ELogLevel} from "./enums";
export interface IClientinfo {
  data?: IDataEntry[];
  Connection: any;
  roles: string[];
  id: string;
  login: string;
  loginTimestamp: Date;
  messageHandle:CallableFunction;
}
export interface ILogInfo {
  additionals?:any,
  level:ELogLevel,
  message:string,
}
export interface IMessage {
  message: string;
  data?: IDataEntry[];
}
export interface IPlugininfo {
  name: string;
  description: string;
  data: IDataEntry[];
  settings: IPluginsettingEntry[];
}
export interface IPluginsettingEntry extends IDataEntry{
  valueIsOptionIndex?: boolean;
  options?: string[];
  callback?: (props?: unknown) => void;
  props?: unknown;
}
export interface IResponse {
  request: IMessage;
  response: IMessage & { requestId: string };
}
