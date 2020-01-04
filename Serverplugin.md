# Socommu Serverplugin

## Base Plugins

- AuthPlugin
- LogPlugin

## Create a Serverplugin
`ExamplePlugin.js`

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



`index.srv`

    import ExamplePlugin from "ExamplePlugin";
    import {Server} from "socommujs";
    
    const myServer = new Server();
    myServer.addPlugin(ExamplePlugin);
    
    myServer.listen();
    

## Create a Authenticationplugin
To create a Authenticationplugin use the AuthPlugin to extend instead of Serverplugin.
For example:

`ExampleAuthPlugin.js`

    import {Serverplugin} from 'socommujs';
    
    class ExamplePlugin extends Serverplugin {
        constructor(){
            super();
            this.setName('ExampleAuthPlugin');
        }
        
        checkLogin(username, password){
            
        }
    }


## Socommujs-plugins
