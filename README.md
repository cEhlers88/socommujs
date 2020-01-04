# ! work in progress !

# SocommuJS `SocketCommunication` 
Christoph Ehlers 19/20
- Plugin based Websocket-Server
- Websocket-Client

## Install
    npm install socommujs

## Using 

### Server

#### Basic Example
    import Server from "socommujs/dist/Server";

    const port = 2607; // this is the default port
    const myServer = new Server();
    
    myServer.listen(port);
    
    
#### Using Plugins
    import Server from "socommujs/dist/Server";    
    import AuthPlugin from "socommujs/dist/serverplugin/AuthPlugin";
    
    const myServer = new Server();
    
    myServer.addPlugin(new AuthPlugin());
    myServer.listen();
    

### Client

## API

### Server 
- addEventListener
- addPlugin
- Eventhandler
- getPort
- getState
- HttpServer
- listen
- plugins
- setPort
- WebsocketServer


### Client
- connect
- send
- sendRequest
- on
- Socket
