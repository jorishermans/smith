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

let registered = false;
/** This function is your starting point to open a websocket on the client. */
export const openWebSocket = (url: string): OpenWebSocket => {
    const socket = new WebSocket(url);
    
    const registerHandlers = (handlers: ClientProtocol[]) => {
        if (registered) return;
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
          }
        
          socket.addEventListener("open", handleOpen);
          socket.addEventListener("message", handleMessage);
          socket.addEventListener("error", handleError);
          socket.addEventListener("close", handleClose);
          registered = true;
    }

    return { socket, registerHandlers };
}
