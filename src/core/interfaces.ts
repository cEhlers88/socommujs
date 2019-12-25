export interface IClientinfo {
  roles: string[];
  id: string;
  Connection: any;
  login: string;
  loginTimestamp: Date;
}
export interface IMessage {
  command: string;
  props?: unknown;
}
export interface IPlugindataEntry {
  name: string;
  value: any;
}
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
