import Server from "../src/core/Server";
import {EServerState} from "../src/lib/enums";
import AuthPlugin from "../src/serverplugin/AuthPlugin";

class TestPlugin extends AuthPlugin {}

let myServer:Server;
beforeEach(()=>{
  myServer = new Server();
});
afterEach(()=>{
  myServer.close();
});
describe("Test some Server basics",()=>{
  test('After init, Serververport should be 2607', () => {
    expect(myServer.getPort()).toBe(2607);
  });

  test('After init, Serverstate should be initialized', () => {
    expect(myServer.getState()).toBe(EServerState.initialized);
  });

  test('After set port to 7026, Serververport should be 7026', () => {
    myServer.setPort(7026);
    expect(myServer.getPort()).toBe(7026);
  });
  test('After set port directly on listen to 7026, Serververport should be 7026', () => {
    myServer.listen(7026);
    setTimeout(()=>{
      expect(myServer.getPort()).toBe(7026);
    },50)
  });
});

describe("Test pluginhandling",()=>{
  test("Add invalid plugin should throw an exception",()=>{
    expect(()=>{
      myServer.addPlugin({});
    }).toThrowError('Invalid plugin');
  });
  test("When added one valid plugin, there should be one plugin",()=>{
    myServer.addPlugin(new AuthPlugin());
    expect(myServer.getPlugins().length).toBe(1);
  });
  test("When added two valid plugins, there should be two plugins",()=>{
    myServer.addPlugin(new AuthPlugin());
    myServer.addPlugin(new AuthPlugin());
    expect(myServer.getPlugins().length).toBe(2);
  });
  test("When added one valid plugins, one invalid and one valid again, there should be two plugins",()=>{
    myServer.addPlugin(new AuthPlugin());
    try{
      myServer.addPlugin({});
    }catch(e){}
    myServer.addPlugin(new AuthPlugin());
    expect(myServer.getPlugins().length).toBe(2);
  });
  test("When added one TestPlugin, there should be one plugin",()=>{
    myServer.addPlugin(new AuthPlugin());
    expect(myServer.getPlugins().length).toBe(1);
  });
});

describe("Test eventhandling",()=>{
  test("test",()=>{
    const fn = jest.fn();
    myServer.addEventListener("serverStart",fn);
    myServer.listen();
    setTimeout(()=>{
      expect(fn).toHaveBeenCalled();
    },50);
  });
});


