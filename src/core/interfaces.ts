interface IDataEntry {
  name: string;
  value: any;
}
export interface IClientdata extends IDataEntry{}
export interface IClientinfo {
  data?:IClientdata[]|null,
  Connection: any;
  roles: string[];
  id: string;
  login: string;
  loginTimestamp: Date;
}
export interface IMessage {
  command: string;
  props?: unknown;
}
export interface IPlugindataEntry extends IDataEntry{}
export interface IPlugininfo {
  name: string;
  description: string;
  data: IPlugindataEntry[];
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
  response: IMessage;
}
