import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private _handlers: { [name: string]: EventHandlerInterface[] } = {}

    notify(event: EventInterface): void {
        const eventName = event.constructor.name
        this._handlers[eventName]?.forEach(handler => handler.handle(event))
    }

    register(eventName: string, eventHandler: EventHandlerInterface){
        if(!this._handlers[eventName]) (this._handlers[eventName] = [])
        this._handlers[eventName] = [...this._handlers[eventName], eventHandler]
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface){
        this._handlers[eventName] = this._handlers[eventName].filter(el => el !== eventHandler)
    }

    unregisterAll(): void {
        this._handlers = {}
    }

    getHandlers(eventName: string): EventHandlerInterface[] {
        return this._handlers[eventName]
    }
}