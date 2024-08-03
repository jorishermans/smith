import { dispatcher } from "./dispatcher.ts";
import { Protocol } from "./protocol.ts";

/** This function helps you in setting up a websocket connection with the right protocols registered. 
 * @param socket websocket that you get out of Deno.upgradeWebSocket
 * @param protocols array of protocols of type protocol
*/
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