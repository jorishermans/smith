export type Message = string | ArrayBufferLike | Blob | ArrayBufferView;

export class Dispatcher {
    clients = new Map<number, WebSocket>();
    clientId = 0;

    dispatch(id: number, msg: Message): void {
        const client = this.clients.get(id);
        client?.send(msg);
    }

    register(ws: WebSocket) {
        const id = ++this.clientId;
        this.clients.set(id, ws);
        return id;
    }

    unregister(id: number) {
        this.clients.delete(id);
    }
}

export const dispatcher = new Dispatcher();

export const dispatch = (id: number, message: Message) => {
    dispatcher.dispatch(id, message);
}