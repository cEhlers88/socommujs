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
    > Add eventlistener 
- addPlugin(plugin:Serverplugin)
    > Add a new Serverplugin. Plugins need to be an instance of 
- close(stopPluginRunInterval:boolean=true)
    > Close the HttpServer-listening and stop runing serverplugins (to prevent stop runing plugins, you have to set 'stopPluginRunInterval' to 'false')
- getPlugins():IServerplugin[]
    > Return active serverplugins
- getPort()
    > Get Serverport
- getState()
    > Get Serverstate
- listen(port:number|null=null)
    > Start listen for incoming connections
- setPort(port:number)
    > Specify Serverport
- setRunInterval(newIntervalMs:number|null)
    > Specify interval to run plugins in miliseconds or set to 'null' to disable.

### Client
- close
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
myServer.EvtHandler
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

> To see how to use Serverplugins to handle Serverevents click [here](https://github.com/cEhlers88/socommujs/blob/master/Serverplugin.md#handle-serverevents).
