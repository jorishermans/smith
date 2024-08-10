import { dispatch, Message } from "./dispatcher.ts";
import { ProtocolEvent } from "common";

/** This abstract class you need to inherit to set up a protocol. */
export abstract class Protocol extends ProtocolEvent {
    public socket?: WebSocket;
    public id: number = -1;

    constructor() {
        super()
    }

    public open(id: number, socket: WebSocket): void {
        this.socket = socket;
        this.id = id;
    }

    abstract message(id: number, message: MessageEvent): void;

    public close(_id: number): void {}

    public error(_id: number): void {}

    send(message: Message) {
        dispatch(this.id, message);
    }
}