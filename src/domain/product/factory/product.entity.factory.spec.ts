import Price from "../entity/price"
import { v4 as uuid } from 'uuid'
import ProductFactory from "./product.entity.factory"

describe("product factory unit test", () => {
    it("should create product type A", () => {
        const prices = [
            {
                label: '45m³',
                stock: 88,
                value: 98
            }
        ]
        const product = ProductFactory.create({
            type: 'A',
            name: 'Product#04',
            prices
        })

        expect(product).toBeDefined()
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product#04")
        expect(product.prices.map(price => ({
            label: price.label,
            stock: price.stock,
            value: price.value,
        }))).toStrictEqual(prices)
        expect(product.constructor.name).toBe("Product")
    })

    it("should create product type B", () => {
        const prices = [
            {
                label: 'gg',
                stock: 78,
                value: 112.66
            }
        ]
        const product = ProductFactory.create({
            type: 'B',
            name: 'Product#09',
            prices
        })

        expect(product).toBeDefined()
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product#09")
        expect(product.prices.map(price => ({
            label: price.label,
            stock: price.stock,
            value: price.value,
        }))).toStrictEqual(prices)
        expect(product.constructor.name).toBe("ProductB")
    })

    it("should throw an error when product type is not supported", () => {
        expect(() => {
            ProductFactory.create({
                type: 'C',
                name: 'Product#18',
                prices: [
                    {
                        label: '12m³',
                        value: 55,
                        stock: 89
                    }
                ]
            })
        }).toThrowError("Product type not supported.")
    })
})