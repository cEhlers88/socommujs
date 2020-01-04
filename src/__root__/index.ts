import Class_Client from "core/Client";
//import Class_ClientPlugin from "ClientPlugin";
import Class_Server from "core/Server";
import Class_Serverplugin from "core/Serverplugin";

export default {
    Client:Class_Client,
    //ClientPlugin:Class_ClientPlugin,
    Server:Class_Server,
    ServerPlugin:Class_Serverplugin
};

export const Client = Class_Client;
//export const ClientPlugin = Class_ClientPlugin;
export const Server = Class_Server;
export const ServerPlugin = Class_Serverplugin;