import { v4 as uuid } from 'uuid'
import Item from './item'
import Order from './order'

describe("Order entity unit test", () => {
    it("should throw an erro when id is empty", () => {
        expect(() => {
            const order = new Order({
                id: "",
                customerId: "",
                items: [
                    new Item({
                        id: uuid(),
                        value: 500,
                        productId: uuid(),
                        priceId: uuid(),
                        quantity: 1,
                    })
                ]
            })
        }).toThrowError("Id is required.")
    })

    it("should throw an error when customerId is empty", () => {
        expect(() => {
            const order = new Order({
                id: uuid(),
                customerId: "",
                items: [
                    new Item({
                        id: uuid(),
                        value: 988.66,
                        productId: uuid(),
                        priceId: uuid(),
                        quantity: 1,
                    })
                ]
            })
        }).toThrowError("Costumer Id is required.")
    })

    it("should throw an error when items is empty", () => {
        expect(() => {
            const order = new Order({
                id: uuid(),
                customerId: uuid(),
                items: []
            })
        }).toThrowError("Items are required.")
    })

    it("should throw an error when some items has invalid quantity", () => {
        expect(() => {
            const order = new Order({
                id: uuid(),
                customerId: uuid(),
                items: [
                    new Item({
                        id: uuid(),
                        value: 988.66,
                        productId: uuid(),
                        priceId: uuid(),
                        quantity: 0,
                    })
                ]
            })
        }).toThrowError("Quantity must be grather than zero.")
    })


    it("should calculate total of order", () => {
        //arrange
        const order = new Order({
            id: uuid(),
            customerId: uuid(),
            items: [
                new Item({
                    value: 500,
                    id: uuid(),
                    productId: uuid(),
                    priceId: uuid(),
                    quantity: 1,
                }),
                new Item({
                    value: 988.66,
                    id: uuid(),
                    productId: uuid(),
                    priceId: uuid(),
                    quantity: 2,
                })
            ]
        })

        //act
        const total = order.getTotal()

        //assert
        expect(total).toBe(500+988.66*2)
    })
})