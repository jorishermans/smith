export abstract class Protocol {
    public socket?: WebSocket;
    public id: number = -1;

    constructor() {}

    public open(id: number, socket: WebSocket): void {
        this.socket = socket;
        this.id = id;
    }

    abstract message(id: number, message: MessageEvent): void;

    abstract close(id: number): void;

    abstract error(id: number): void;
}