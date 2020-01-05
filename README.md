# SocommuJS `SocketCommunication` 
Christoph Ehlers 19/20
- Plugin based Websocket-Server
- Websocket-Client

###### ! work in progress !
- [ ] Complete documentation
    - [ ] Basic Usage
    - [ ] Create Serverplugin
    - [ ] Create Authenticationplugin
    
## Install
```shell script
npm install socommujs
```

## Using 

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
