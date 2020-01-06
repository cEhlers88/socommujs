import Server from "../src/core/Server";
import {EServerState} from "../src/lib/enums";

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
      // @ts-ignore
      myServer.addPlugin({});
    }).toThrowError('Invalid plugin');
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


