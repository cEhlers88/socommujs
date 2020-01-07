import {EServerEvent} from "../lib/enums";

export default interface IServerplugin{
    getListenEvents(): EServerEvent[] | string,
    getRequiredServerData(): string[],
    handleEvent(event: EServerEvent, eventProps?: unknown): void,
    run(data?: unknown): void,
    init():void,
    setData(key: string, value: any): IServerplugin,
    setLogHandle(newHandle: CallableFunction): IServerplugin
}