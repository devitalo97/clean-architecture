import Price from "../../product/entity/price"
import Product from "../../product/entity/product"
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler"
import ProductCreatedEvent from "../../product/event/product-created.event"
import EventDispatcher from "./event-dispatcher"
import { v4 as uuid } from 'uuid'

const MockEventHandler = () => {
    return {
        handle: jest.fn()
    }
}

describe("domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")).toBeDefined()
        expect(eventDispatcher.getHandlers("ProductCreatedEvent").length).toBe(1)
        expect(eventDispatcher.getHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler)
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler)

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")).toBeDefined()
        expect(eventDispatcher.getHandlers("ProductCreatedEvent").length).toBe(0)
    })

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        const mockHandler = MockEventHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)
        eventDispatcher.register('ProductMockedEvent', mockHandler)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getHandlers("ProductCreatedEvent")).toBeUndefined()
        expect(eventDispatcher.getHandlers("ProductMockedEvent")).toBeUndefined()

    })

    it("should notify event", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandlerOne = MockEventHandler()

        const eventHandlerTwo = MockEventHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandlerOne)
        eventDispatcher.register('ProductCreatedEvent', eventHandlerTwo)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent").length).toBe(2)
        expect(eventDispatcher.getHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandlerOne)
        expect(eventDispatcher.getHandlers("ProductCreatedEvent")[1]).toMatchObject(eventHandlerTwo)

        const productCreatedEvent = new ProductCreatedEvent({
            eventData: new Product({
                id: uuid(),
                name: 'Product#09',
                prices: [
                    new Price({
                        id: uuid(),
                        stock: 78,
                        label: 'm',
                        value: 89
                    })
                ]
            })
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(eventHandlerOne.handle).toHaveBeenCalled()
        expect(eventHandlerTwo.handle).toHaveBeenCalled()
    })
})