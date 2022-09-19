import Price from "../../../domain/product/entity/price"
import Product from "../../../domain/product/entity/product"
import { v4 as uuid } from 'uuid'
import ListProductUseCase from "./list.usecase"

const productOne = new Product({
    id: uuid(),
    name: 'Product#675',
    prices: [
        new Price({
            id: uuid(),
            label: '2x3',
            value: 55,
            stock: 2
        })
    ]
})

const productTwo = new Product({
    id: uuid(),
    name: 'Product#676',
    prices: [
        new Price({
            id: uuid(),
            label: '12m³',
            value: 66,
            stock: 70
        }),
        new Price({
            id: uuid(),
            label: '8m³',
            value: 54,
            stock: 16
        })
    ]
})

const products = [productOne, productTwo]

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("list product usecase unit test", () => {
    it("should list products", async () => {
        const repository = MockRepository()

        const usecase = new ListProductUseCase(repository)

        const input = {}

        const output = await usecase.execute(input)

        expect(output.products).toBeDefined()
        expect(output.products.length).toBe(2)
        expect(output.products).toStrictEqual(products.map(product => ({
            id: product.id,
            name: product.name,
            prices: product?.prices?.map(price => ({
                id: price.id,
                label: price.label,
                value: price.value,
                stock: price.stock,
            })),
        })))
    })
})