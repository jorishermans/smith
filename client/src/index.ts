import {IProtocol, Protocol} from 'common';
export interface IClientProtocol {
    open?: (id: number, socket: WebSocket) => void;
    message: (event: MessageEvent) => void;
    close?: (id: number) => void;
    error?: (id: number, event: Event) => void;
}
export abstract class ClientProtocol extends Protocol { }
export interface OpenWebSocket {
    socket: WebSocket;
    registerHandlers: (handlers: IProtocol[]) => void;
}
export type OpenWebSocketReturnFn = (handlers: IProtocol[]) => void

let id = -1;
const registered = new Map<string, boolean>();
/** This function is your starting point to open a websocket on the client. */
export const openWebSocket = (url: string): OpenWebSocket => {
    const socket = new WebSocket(url);
    const newId = ++id;
    registered.set(url , false);
    const registerHandlers = (handlers: IProtocol[]) => {
        const isRegistered = registered.get(url);
        if (isRegistered) return;
        const handleOpen = () => {
            handlers.forEach(h => h.open?.(newId, socket));
          };
          const handleMessage = (event: MessageEvent) => {
            handlers.forEach(h => h.message(id, event));
          };
          const handleError = (event: Event) => {
            handlers.forEach(h => h.error?.(id, event));
          };
          const handleClose = () => {
            handlers.forEach(h => h.close?.(id));
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
