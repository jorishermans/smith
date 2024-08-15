import { dispatch, Message } from "./dispatcher.ts";
import { Protocol } from 'common';

/** This abstract class you need to inherit to set up a protocol. */
export abstract class ServerProtocol extends Protocol {

    constructor() {
        super()
    }

    abstract message(id: number, message: MessageEvent): void;

    send(message: Message) {
        dispatch(this.id, message);
    }
}