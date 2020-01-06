import Client from "../src/core/Client";
import Server from "../src/core/Server";
import Serverplugin from "../src/core/Serverplugin";
import {EServerEvent} from "../src/lib/enums";

let myServer:Server;
let myClient:Client;

const Testplugin = new(class extends Serverplugin {
    getListenEvents(): EServerEvent[] | string {
        return [EServerEvent.clientWillConnect];
    }

    handleEvent(event: EServerEvent, eventProps?: unknown): void {
        const doNothing:boolean=true;
    }

    run(data?: unknown): void {
        const doNothing:boolean=true;
    }
});

beforeAll(()=>{
    myServer = new Server();
    myServer.addPlugin(Testplugin);
    myServer.listen();
});

beforeEach(()=>{
    myClient = new Client();
    myClient.connect("localhost");
    Testplugin.run();
});
afterAll(()=>{
    myServer.close();
});

describe("dummysuite",()=>{
   test("dummytest",()=>{
       expect(true).toBe(true);
   });
});