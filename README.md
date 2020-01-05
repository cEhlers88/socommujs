# SocommuJS `SocketCommunication` 
Christoph Ehlers 19/20
- Plugin based Websocket-Server
- Websocket-Client

###### ! work in progress !
- [ ] Complete documentation
    - [X] Installation
    - [ ] Basic Usage
        - [X] Server  
        - [ ] Client  
    - [ ] Create Serverplugin
    - [ ] Create Authenticationplugin
    
## Install
```shell script
npm install socommujs
```

## Using Socommujs

### Server

#### Basic Example
```javascript
import Server from "socommujs/dist/Server";

const port = 2607; // this is the default port
const myServer = new Server();

myServer.listen(port);
``` 

#### Using Plugins
```javascript
import Server from "socommujs/dist/Server";    
import AuthPlugin from "socommujs/dist/serverplugin/AuthPlugin";

const myServer = new Server();

myServer.addPlugin(new AuthPlugin());
myServer.listen();
```

### Client

## API

### Server 
- addEventListener(event, properties)
- addPlugin(plugin)
- Eventhandler
- getPort()
- getState()
- HttpServer
- listen([port])
- plugins
- setPort(port)
- WebsocketServer

### Client
- connect
- send
- sendRequest
- on
- Socket

## Events

### Serverevents
- clientConnected
- clientDisconnected
- clientWillConnect
- getAuthenticatedRequest
- getClientRequest
- getUnauthenticatedRequest
- log
- serverInitialized
- serverStart
- serverStop

###### Example listen Serverevent directly 
`Example 1 (using eventname):` 
```javascript
import Server from "socommujs/dist/Server";

const myServer = new Server();

myServer.addEventListener('serverStart',()=>{
    // do something
});
```
`Example 2 (using EServerEvent-Enum):`
```javascript
import Server from "socommujs/dist/Server";
import {EServerEvent} from "socommujs/dist/lib/enums";

const myServer = new Server();

myServer.addEventListener(EServerEvent.serverStart,()=>{
    // do something
});
```

> To see how to use Serverplugins to handle Serverevents click [here](https://github.com/cEhlers88/socommujs/blob/Documentation/Serverplugin.md#handle-serverevents).
