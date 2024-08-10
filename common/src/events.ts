/** represents a callback */
interface Callable {
    [key: string]: Function;
}
/** link callbacks to key's */
interface Subscriber {
    [key: string]: Callable;
}
/** registery with unregister possiblities */
interface Registry {
    unregister: () => void;
}
/** dispatch an event and register on an event */  
interface IProtocolEvent {
    dispatch<T>(event: string, arg?: T): void;
    register(event: string, callback: Function): Registry;
}
/** ProtocolEvent let's you have the ability to subscribe on or off data events that happens on the protocol. */
export class ProtocolEvent implements IProtocolEvent {
    private subscribers: Subscriber;
    private static nextId = 0;
  
    constructor() {
      this.subscribers = {};
    }
  
    public dispatch<T>(event: string, arg?: T): void {
      const subscriber = this.subscribers[event];
      if (subscriber === undefined) {
        return;
      }
  
      Object.keys(subscriber).forEach((key) => subscriber[key](arg));
    }
  
    public register(event: string, callback: Function): Registry {
      const id = this.getNextId();
      if (!this.subscribers[event]) {
        this.subscribers[event] = {};
      }
  
      this.subscribers[event][id] = callback;
  
      return {
        unregister: () => {
          delete this.subscribers[event][id];
          if (Object.keys(this.subscribers[event]).length === 0) {
            delete this.subscribers[event];
          }
        },
      };
    }
  
    private getNextId(): number {
      return ProtocolEvent.nextId++;
    }
}
