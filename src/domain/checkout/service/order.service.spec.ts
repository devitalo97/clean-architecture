import Order from "../entity/order"
import { v4 as uuid } from 'uuid'
import OrderService from "./order.service"
import Customer from "../../customer/entity/customer"
import Item from "../entity/item"

describe("order service unit test", () => {
    it("should place an order", () => {
        const customer = new Customer({
            id: uuid(),
            name: 'Customer#00'
        })
        const itemOne = new Item({
            id: uuid(),
            priceId: uuid(),
            productId: uuid(),
            value: 966.55,
            quantity: 2
        })
        const itemTwo = new Item({
            id: uuid(),
            priceId: uuid(),
            productId: uuid(),
            value: 337.24,
            quantity: 3
        })

        const totalItems = itemOne.getValue() + itemTwo.getValue()

        const order = OrderService.placeOrder({
            customer, 
            items: [itemOne, itemTwo]
        })
        
        expect(order.getTotal()).toBe(totalItems)
        expect(customer.getPoints()).toBe(totalItems/2)
    })
    it("should get total of all orders", () => {
        const orderOne = new Order({
            id: uuid(),
            customerId: uuid(),
            items: [
                new Item({
                    id: uuid(),
                    productId: uuid(),
                    priceId: uuid(),
                    value: 500,
                    quantity: 2
                }),
                new Item({
                    id: uuid(),
                    productId: uuid(),
                    priceId: uuid(),
                    value: 896.66,
                    quantity: 5
                })
            ]
        })

        const orderTwo = new Order({
            id: uuid(),
            customerId: uuid(),
            items: [
                new Item({
                    id: uuid(),
                    productId: uuid(),
                    priceId: uuid(),
                    value: 256.36,
                    quantity: 3
                }),
                new Item({
                    id: uuid(),
                    productId: uuid(),
                    priceId: uuid(),
                    value: 985.25,
                    quantity: 9
                })
            ]
        })

        const total = OrderService.total([orderOne, orderTwo])

        expect(total).toBe((500*2 + 896.66*5) + (256.36*3 + 985.25*9))
    })
})