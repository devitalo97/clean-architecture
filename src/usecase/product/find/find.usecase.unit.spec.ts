import Price from "../../../domain/product/entity/price"
import Product from "../../../domain/product/entity/product"
import { v4 as uuid } from 'uuid'
import FindProductUseCase from "./find.usecase"

const product = new Product({
    id: uuid(),
    name: "Product#33",
    prices: [
        new Price({
            id: uuid(),
            label: '15m³',
            stock: 55,
            value: 65.99
        })
    ]
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
    }
}

describe("find customer usecase unit test", () => {

    it("should find a product", async () => {
      const repository = MockRepository()  

      const usecase = new FindProductUseCase(repository)

      const input = {
        id: product.id
      }

      const output = await usecase.execute(input)

      expect(output).toBeDefined()
      expect(output.id).toBe(input.id)
      expect(output.name).toBe(product.name)
      expect(output.prices).toStrictEqual(product.prices.map(price => ({
        id: price.id,
        label: price.label,
        value: price.value,
        stock: price.stock,
      })))
        
    })

    it("should throw an error when product not found", async () => {
        const repository = MockRepository()  
        repository.find.mockImplementation(() => {
            throw new Error("Product not found.")
        })

        const usecase = new FindProductUseCase(repository)
  
        const input = {
          id: product.id
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("Product not found.")
    })
})