import { dispatcher } from "./dispatcher.ts";
import { Protocol } from "./protocol.ts";

export function webSocketHandler(socket: WebSocket, protocols: Protocol[]) {
  const id = dispatcher.register(socket);

  socket.onopen = () => {
    protocols.forEach(protocol => protocol.open(id, socket));
  };

  socket.onmessage = (e) => {
    protocols.forEach(protocol => protocol.message(id, e));
  };

  socket.onclose = () => {
    protocols.forEach(protocol => protocol.close(id));

    dispatcher.unregister(id);
  };

  socket.onerror = () => {
    protocols.forEach(protocol => protocol.error(id));
  }
}