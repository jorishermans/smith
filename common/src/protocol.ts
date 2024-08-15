import { ProtocolEvent } from "./events.ts";

/* a common way to handle a message in the protocol class */
export type Message = string | ArrayBufferLike | Blob | ArrayBufferView;

/* an interface that represents a protocol */
export interface IProtocol {
    open?: (id: number, socket: WebSocket) => void;
    message: (id: number, event: MessageEvent) => void;
    close?: (id: number) => void;
    error?: (id: number, event: Event) => void;
}
/* abstract implementation of a protocol, a great starting point to align client with server */
export abstract class Protocol extends ProtocolEvent implements IProtocol {
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

    abstract send(message: Message): void;
}