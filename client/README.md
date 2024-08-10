# @smith/client

Can be used for setting up websocket client without the boilerplate code.

Open a websocket connection.
```ts
const {socket, registerHandlers} = openWebSocket("ws://localhost:8000/api/search-socket");
```

You also need to register you handlers.
```ts
registerHandlers([{
    message: (message: MessageEvent) => {
        // your code to listen to message's
    
      }
}])
```