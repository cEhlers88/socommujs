import {IDataEntry} from "@cehlers88/ceutils/dist/interfaces";
export interface IClientinfo {
  data?:IDataEntry[]|null,
  Connection: any;
  roles: string[];
  id: string;
  login: string;
  loginTimestamp: Date;
}
export interface IMessage {
  message: string;
  data?: IDataEntry[];
}
export interface IPlugininfo {
  name: string;
  description: string;
  data: IDataEntry[];
  settings: Array<{ name: string; value: string | number }>;
}
export interface IPluginsettingEntry {
  name: string;
  value: string | number;
  valueIsOptionIndex?: boolean;
  options?: string[];
  callback?: (props?: unknown) => void;
  props?: unknown;
}
export interface IResponse {
  request: IMessage;
  response: IMessage & {requestId:string};
}
