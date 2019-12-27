import Serverplugin from "../core/Serverplugin";
import {serverevent} from "../core/enums";

export default class extends Serverplugin{
    public getListenEvents(): serverevent[] {
        return [
            serverevent.clientWillConnect
        ]
    }
    public getName(): string {
        throw new Error("Method not implemented.");
    }
    public handleEvent(event: serverevent, eventProps?: unknown): void {
        switch (event) {
            case serverevent.clientWillConnect:
                break;
        }
    }
    public run(data?: unknown): void {
        throw new Error("Method not implemented.");
    }


}