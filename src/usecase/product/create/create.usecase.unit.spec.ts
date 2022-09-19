import CreateProductUseCase from "./create.usecase"

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}
describe("create product usecase unit test", () => {
    it("shloud throw an error when name is blank", async () => {
        const repository = MockRepository()

        const usecase = new CreateProductUseCase(repository)

        const input = {
            name: '',
            prices: [
                {
                    label: 'gg',
                    stock: 88,
                    value: 654.69
                }
            ]
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("Name is required.")
    })

    it("shloud throw an error when price is invalid", async () => {
        const repository = MockRepository()

        const usecase = new CreateProductUseCase(repository)

        const input = {
            name: '',
            prices: [
                {
                    label: 'pp',
                    stock: 66,
                    value: 0
                }
            ]
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("Value must be valid.")
    })

    it("should create a product", async () => {
        const repository = MockRepository()

        const usecase = new CreateProductUseCase(repository)

        const input = {
            name: "Product#455",
            prices: [
                {
                    label: 'gg',
                    stock: 66,
                    value: 55
                },
                {
                    label: 'p',
                    stock: 36,
                    value: 45
                }
            ]
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            prices: expect.any(Array)
        })
        
        expect(output.prices.map(price => ({
            label: price.label,
            stock: price.stock,
            value: price.value
        }))).toStrictEqual(input.prices)

        expect(output.prices.map(price => price.id).length).toBe(2)
    })
})