# @smith/server

Can be used for setting up websocket server without the boilerplate code.

First import webSocketHandler and abstract class Protocol

```ts
import { webSocketHandler, Protocol } from "@smith/server";
```

## Define a protocol

Create a protocol that you will use when handling messages.

```ts
class MyProtocol extends Protocol {
    message(id: number, e: MessageEvent) {
        // do something with the message
    }
}
```

## Setting up a websocket connection in Deno

Register your websocket with your supported protocols.

```ts
export const handler = (req: Request): Response => {
  const { socket, response } = Deno.upgradeWebSocket(req);
  webSocketHandler(socket, [new MyProtocol()]);

  return response;
};
```