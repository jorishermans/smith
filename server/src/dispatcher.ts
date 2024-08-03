export class Dispatcher {
    clients = new Map<number, WebSocket>();
    clientId = 0;

    dispatch(id: number, msg: string): void {
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

export const dispatch = (id: number, message: object) => {
    dispatcher.dispatch(id, JSON.stringify(message));
}