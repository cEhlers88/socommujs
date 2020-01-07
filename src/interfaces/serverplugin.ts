import {EServerEvent} from "../lib/enums";

export default interface IServerplugin{
    getListenEvents(): EServerEvent[] | string,
    handleEvent(event: EServerEvent, eventProps?: unknown): void,
    run(data?: unknown): void
}