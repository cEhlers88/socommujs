# ! WIP !

# SocommuJS `SocketCommunication` 
Christoph Ehlers 12/2019

## Install

## Using 

### Server

- Basic Example


    import Server from "socommujs/dist/Server";

    const port = 2607; // this is the default port
    const myServer = new Server();
    
    myServer.listen(port);
    
- Using Plugins


    import Server from "socommujs/dist/Server";
    import AuthPlugin from "socommujs/dist/serverplugin/AuthPlugin";
    
    const myServer = new Server();
    
    myServer.addPlugin(new AuthPlugin());
    myServer.listen();

### Client