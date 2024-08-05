export interface ClientProtocol {
    open?: () => void;
    message: (event: MessageEvent) => void;
    close?: () => void;
    error?: (event: Event) => void;
}
export interface OpenWebSocket {
    socket: WebSocket;
    registerHandlers: (handlers: ClientProtocol[]) => void;
}
export type OpenWebSocketReturnFn = (handlers: ClientProtocol[]) => void

const registered = new Map<string, boolean>();
/** This function is your starting point to open a websocket on the client. */
export const openWebSocket = (url: string, handlers: ClientProtocol[]): OpenWebSocket => {
    const socket = new WebSocket(url);
    registered.set(url , false)
    const registerHandlers = () => {
        const isRegistered = registered.get(url);
        if (isRegistered) return;
        const handleOpen = () => {
            handlers.forEach(h => h.open?.());
          };
          const handleMessage = (event: MessageEvent) => {
            handlers.forEach(h => h.message(event));
          };
          const handleError = (event: Event) => {
            handlers.forEach(h => h.error?.(event));
          };
          const handleClose = () => {
            handlers.forEach(h => h.close?.());
            registered.set(url, false);

            socket.removeEventListener("open", handleOpen);
            socket.removeEventListener("message", handleMessage);
            socket.removeEventListener("error", handleError);
            socket.removeEventListener("close", handleClose);
          }
        
          socket.addEventListener("open", handleOpen);
          socket.addEventListener("message", handleMessage);
          socket.addEventListener("error", handleError);
          socket.addEventListener("close", handleClose);
          registered.set(url, true);
    }

    return { socket, registerHandlers };
}
