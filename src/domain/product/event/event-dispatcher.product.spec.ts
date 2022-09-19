import SendEmailWhenProductIsCreatedHandler from "./handler/send-email-when-product-is-created.handler"
import ProductCreatedEvent from "./product-created.event"
import { v4 as uuid } from 'uuid'
import EventDispatcher from "../../@shared/event/event-dispatcher"
import Product from "../entity/product"
import Price from "../entity/price"

describe("product event dispatcher", () => {

    it("should notify product created event", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const spyEventHander = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getHandlers("ProductCreatedEvent").length).toBe(1)
        expect(eventDispatcher.getHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler)

        const product = new Product({
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
        const productCreatedEvent = new ProductCreatedEvent({
            eventData: product
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHander).toHaveBeenCalled()
    })
})