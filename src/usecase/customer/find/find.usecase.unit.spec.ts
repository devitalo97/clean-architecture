import Customer from "../../../domain/customer/entity/customer"
import { v4 as uuid } from 'uuid'
import FindCustomerUseCase from "./find.usecase"

const customer = new Customer({
    id: uuid(),
    name: 'Customer#09',
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
    }
}




describe("find customer usecase unit test", () => {
    it("should find a customer", async () => {
        const repository = MockRepository()

        const usecase = new FindCustomerUseCase(repository)

        const input = {
            id: customer.id
        }

        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.id).toBe(input.id)
    })

    it("should throw an error in find when customer not found", async () => {
        const repository = MockRepository()
        repository.find.mockImplementation(() => {
            throw new Error("Customer not found.")
        })

        const usecase = new FindCustomerUseCase(repository)

        const input = {
            id: customer.id
        }

        expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrowError("Customer not found.")

        expect(repository.find).toHaveBeenCalled()
    })


})