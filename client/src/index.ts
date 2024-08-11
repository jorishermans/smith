import {ProtocolEvent} from 'common';
export interface IClientProtocol {
    open?: () => void;
    message: (event: MessageEvent) => void;
    close?: () => void;
    error?: (event: Event) => void;
}
export abstract class ClientProtocol extends ProtocolEvent implements IClientProtocol {
    open(): void {}
    abstract message(event: MessageEvent): void;
    close() {}
    error(event: Event) {}
}
export interface OpenWebSocket {
    socket: WebSocket;
    registerHandlers: (handlers: IClientProtocol[]) => void;
}
export type OpenWebSocketReturnFn = (handlers: IClientProtocol[]) => void

const registered = new Map<string, boolean>();
/** This function is your starting point to open a websocket on the client. */
export const openWebSocket = (url: string): OpenWebSocket => {
    const socket = new WebSocket(url);
    registered.set(url , false)
    const registerHandlers = (handlers: IClientProtocol[]) => {
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
