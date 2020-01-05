# Socommu Serverplugin

## Base Plugins

- AuthPlugin
- LogPlugin

## Create a Serverplugin
Click on [Authenticationplugin](https://github.com/cEhlers88/socommujs/blob/Documentation/Serverplugin.md#create-a-authenticationplugin) to create a plugin to handle new clientconnections.

`ExamplePlugin.js`
```javascript
import {Serverplugin} from 'socommujs';

class ExamplePlugin extends Serverplugin {
    constructor(){
        super();
        this.setName('ExamplePlugin');
    }
    
    getListenEvents(){
        return [];
    }
    
    handleEvent(event,props){
    
    }
    
    run(data){
        
    }
}
```

`index.srv`
```javascript
import ExamplePlugin from "ExamplePlugin";
import {Server} from "socommujs";

const myServer = new Server();
myServer.addPlugin(ExamplePlugin);

myServer.listen();
```

## Create a Authenticationplugin
To create a Authenticationplugin use the AuthPlugin to extend instead of Serverplugin.
For example:

`ExampleAuthPlugin.js`
```javascript
import {Serverplugin} from 'socommujs';

class ExamplePlugin extends Serverplugin {
    constructor(){
        super();
        this.setName('ExampleAuthPlugin');
    }
    
    checkLogin(username, password){
        const isOk=true;
        return isOk;
    }
}
```
## Handle Serverevents
> Define which events your plugin is listining for by return an array with eventnames in `getListenEvents`. For example, to listining for 'serverStart' and 'serverStop', do something like this:
```javascript
import {EServerEvent} from "socommujs/dist/lib/enums";
...
getListenEvents(){
    return [
        EServerEvent.serverStart,
        EServerEvent.serverStop
    ];
}
```
> Now you're able to handle 'serverStart' and 'serverStop' in `handleEvent` like:
```javascript
import {EServerEvent} from "socommujs/dist/lib/enums";
...
handleEvent(event,props){
    switch (event) {
      case EServerEvent.serverStart:
        // handle serverStart
        break;
      case EServerEvent.serverStop:
        // handle serverStop
        break;
    }
}
```
> [Here](https://github.com/cEhlers88/socommujs/blob/Documentation/README.md#events)'s a list of all Serverevents.

## Socommujs-plugins
