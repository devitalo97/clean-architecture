import Item from "./item"
import { v4 as uuid } from 'uuid'

describe("item entity unit test", () => {
    it("should throw an error when quaitity is invalid", () => {
        expect(() => {
            const item = new Item({
                id: uuid(),
                productId: uuid(),
                priceId: uuid(),
                value: 55,
                quantity: 0
            })
        }).toThrowError("Quantity must be grather than zero.")
    })
})