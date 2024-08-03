import { dispatch } from "./index.ts";

export abstract class Protocol {
    public socket?: WebSocket;
    public id: number = -1;

    constructor() {}

    public open(id: number, socket: WebSocket): void {
        this.socket = socket;
        this.id = id;
    }

    abstract message(id: number, message: MessageEvent): void;

    public close(_id: number): void {}

    public error(_id: number): void {}

    send(message: object) {
        dispatch(this.id, message);
    }
}