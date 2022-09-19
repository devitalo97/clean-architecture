import OrderFactory from "./order.entity.factory"
import { v4 as uuid } from 'uuid'

describe("order factory unit test", () => {
    it("should create an order", () => {
        const items = [
            {
                productId: uuid(),
                priceId: uuid(),
                value: 55,
                quantity: 2
            }
        ]
        const customerId = uuid()
        const order = OrderFactory.create({
            customerId,
            items
        })

        expect(order).toBeDefined()
        expect(order.id).toBeDefined()
        expect(order.customerId).toBe(customerId)
        expect(order.items.map(item => ({
            productId: item.productId,
            priceId: item.priceId,
            value: item.value,
            quantity: item.quantity,
        }))).toStrictEqual(items)
        expect(order.getTotal()).toBe(110)
    })
})