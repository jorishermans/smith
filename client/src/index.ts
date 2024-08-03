export interface ClientProtocolHandler {
    open: () => void;
    message: (event: MessageEvent) => void;
    close: () => void;
    error: (event: Event) => void;
}
export interface OpenWebSocket {
    socket: WebSocket;
    registerHandlers: (handlers: ClientProtocolHandler[]) => void;
    open: boolean;
}
export type OpenWebSocketReturnFn = (handlers: ClientProtocolHandler[]) => void

/** This function is your starting point to open a websocket on the client. */
export const openWebSocket = (url: string): OpenWebSocket => {
    const socket = new WebSocket(url);
    let open = false;
    const registerHandlers = (handlers: ClientProtocolHandler[]) => {
        const handleOpen = () => {
            handlers.forEach(h => h.open());
            open = true;
          };
          const handleMessage = (event: MessageEvent) => {
            handlers.forEach(h => h.message(event));
          };
          const handleError = (event: Event) => {
            handlers.forEach(h => h.error(event));
          };
          const handleClose = () => {
            handlers.forEach(h => h.close());
          }
        
          socket.addEventListener("open", handleOpen);
          socket.addEventListener("message", handleMessage);
          socket.addEventListener("error", handleError);
          socket.addEventListener("close", handleClose);
    }

    return { socket, registerHandlers, open };
}
