import Interface_Clientinfo from './clientinfo';
import Interface_Plugininfo from './plugininfo';
import Interface_PluginsettingEntry from './pluginsettingEntry';
import Interface_Message from './message';
import Interface_Response from './response';

export default {};

export interface IClientinfo extends Interface_Clientinfo {}
export interface IPlugininfo extends Interface_Plugininfo {}
export interface IPluginsettingEntry extends Interface_PluginsettingEntry {}
export interface IMessage extends Interface_Message {}
export interface IResponse extends Interface_Response {}
