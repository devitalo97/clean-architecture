import Price from "../../../domain/product/entity/price"
import Product from "../../../domain/product/entity/product"
import { v4 as uuid } from 'uuid'
import UpdateProductUseCase from "./update.usecase"

const product = new Product({
    id: uuid(),
    name: 'Product#088',
    prices: [
        new Price({
            id: uuid(),
            label: '1 andar',
            stock: 22,
            value: 98.88
        }),
        new Price({
            id: uuid(),
            label: '2 andar',
            stock: 11,
            value: 255.90
        })
    ]
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(), 
    }
}

describe("update product usecase unit test", () => {
    it("should update a product", async () => {
        const repository = MockRepository()
        
        const usecase = new UpdateProductUseCase(repository)

        const priceToChange = {
            id: product.prices[0].id,
            label: "new label",
            value: 225.60,
            stock: 889
        }

        const input = {
            id: product.id,
            name: "Product att",
            prices: [
                priceToChange
            ]
        }
        
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            prices: expect.any(Array)
        })

        expect(output.prices.length).toBe(2)

        const priceChanged = output.prices.filter(price => price.id === priceToChange.id)

        expect(priceChanged).toBeDefined()
        expect(priceChanged.length).toBe(1)
        expect(priceChanged.map(price => ({
            id: price.id,
            label: price.label,
            value: price.value,
            stock: price.stock,
        }))).toStrictEqual([priceToChange])
    })
    
    it("should throw an error when update product with invalid price", () => {
        const repository = MockRepository()

        const usecase = new UpdateProductUseCase(repository)

        const input = {
            id: product.id,
            prices: [
                {
                    id: product.prices[0].id,
                    label: "5m",
                    value: 96.99,
                    stock: 0
                }
            ]
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("Stock must be valid.")

        expect(repository.find).toHaveBeenCalled()
    })

    it("should throw an error when update product with invalid name", async () => {
        const repository = MockRepository()

        const usecase = new UpdateProductUseCase(repository)

        const input = {
            id: product.id,
            name: "",
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("product: Name is required.")

        expect(repository.find).toHaveBeenCalled()
    })

    it("should update a product price with some price props", async () => {
        const repository = MockRepository()
        
        const usecase = new UpdateProductUseCase(repository)

        const priceToChange = {
            id: product.prices[0].id,
            label: "label att",
            value: 219.66,
        }

        const input = {
            id: product.id,
            prices: [
                priceToChange
            ]
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: expect.any(String),
            prices: expect.any(Array)
        })

        expect(output.prices.length).toBe(2)

        const priceChanged = output.prices.filter(price => price.id === priceToChange.id)

        expect(priceChanged).toBeDefined()
        expect(priceChanged.length).toBe(1)
        expect(priceChanged.map(price => ({
            id: price.id,
            label: price.label,
            value: price.value,
            stock: price.stock,
        }))).toStrictEqual([{...priceToChange, stock: 11}])
    })

    it("should update a product price with all price props", async () => {
        const repository = MockRepository()
        
        const usecase = new UpdateProductUseCase(repository)

        const priceToChange = {
            id: product.prices[0].id,
            label: "label att",
            value: 219.66,
            stock: 77
        }

        const input = {
            id: product.id,
            prices: [
                priceToChange
            ]
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: expect.any(String),
            prices: expect.any(Array)
        })

        expect(output.prices.length).toBe(2)

        const priceChanged = output.prices.filter(price => price.id === priceToChange.id)

        expect(priceChanged).toBeDefined()
        expect(priceChanged.length).toBe(1)
        expect(priceChanged.map(price => ({
            id: price.id,
            label: price.label,
            value: price.value,
            stock: price.stock,
        }))).toStrictEqual([priceToChange])
    })
})