import CreateCustomerUseCase from "./create.usecase"

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
    }
}
describe("create customer usecase unit test", () => {
    it("should create a client", async () => {
        const repository = MockRepository()
        
        const usecase = new CreateCustomerUseCase(repository)

        const input = {
            name: 'Customer#98',
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            rewardPoints: 0,
            active: false
        })
    })

    it("should create a client with address", async () => {
        const repository = MockRepository()
        
        const usecase = new CreateCustomerUseCase(repository)

        const input = {
            
            name: 'Customer#98',
            address: {
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            rewardPoints: 0,
            active: false,
            address: input.address
        })
    })

    it("should throw an error when name is missing", () => {
        const repository = MockRepository()

        const usecase = new CreateCustomerUseCase(repository)

        const input = {
            name: '',
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("customer: Name is required.")
    })

    it("should throw an error when state is missing in address", () => {
        const repository = MockRepository()

        const usecase = new CreateCustomerUseCase(repository)

        const input = {
            name: 'Customer#98',
            address: {
                state: '',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("State is required.")
    })
})
