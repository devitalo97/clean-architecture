import Price from "../entity/price"
import Product from "../entity/product"
import { v4 as uuid } from 'uuid'
import ProductService from "./product.service"

describe("order service unit test", () => {
    it("should increase product's price in percentage", () => {
        const product0 = new Product({
            id: uuid(),
            name: "Product#00",
            prices: [
                new Price({
                    id: uuid(),
                    label: 'price one',
                    stock: 27,
                    value: 6654.96,
                }),
                new Price({
                    id: uuid(),
                    label: 'price two',
                    stock: 182,
                    value: 76.65,
                })
            ]
        })
        const product1 = new Product({
            id: uuid(),
            name: "Product#01",
            prices: [
                new Price({
                    id: uuid(),
                    label: 'price one',
                    stock: 52,
                    value: 415.96,
                }),
                new Price({
                    id: uuid(),
                    label: 'price two',
                    stock: 66,
                    value: 1986.63,
                })
            ]
        })

        const products = [
            product0,
            product1
        ]

        const priceIdOne = product0.prices[0].id
        const priceIdTwo = product1.prices[0].id

        const prices = [
            priceIdOne,
            priceIdTwo
        ]

        const percentage = 30
        ProductService.increasePrice({
            products,
            price_ids: prices,
            percentage
        })
        
        expect(product0.prices.filter((el:any) => 
            prices.includes(el.id))[0].value).toBe(6654.96+6654.96*percentage/100)
            
        expect(product1.prices.filter((el:any) => 
            prices.includes(el.id))[0].value).toBe(415.96+415.96*percentage/100)
    })
})