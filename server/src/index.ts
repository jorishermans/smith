import { Dispatcher } from "./dispatcher.ts";
import { Protocol } from "./protocol.ts";

const dispatcher = new Dispatcher()

export function webSocketHandler(socket: WebSocket, protocols: Protocol[]) {
  const id = dispatcher.register(socket);

  socket.onopen = () => {
    protocols.forEach(protocol => protocol.open(id, socket));
    console.log('open ' + id);
  };

  socket.onmessage = (e) => {
    console.log(`msg:${id}`, e.data);

    protocols.forEach(protocol => protocol.message(id, e.data));
  };

  socket.onclose = () => {
    protocols.forEach(protocol => protocol.close(id));

    dispatcher.unregister(id);
    console.log('close ' + id);
  };

  socket.onerror = () => {
    protocols.forEach(protocol => protocol.error(id));
  }
}