import CustomerFactory from "../../../domain/customer/factory/customer.entity.factory"
import UpdateCustomerUseCase from "./update.usecase"

const customer = CustomerFactory.create({
    type: 'COMPLETE',
    name: 'Customer#087',
    address: {
        state: 'state',
        city: 'city',
        street: 'street',
        number: 'number',
        complement: 'complement',
        zipCode: 'zipCode',
    }
})

const MockRepository = () => {
    return {
        update: jest.fn(),
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    }
}



describe("update customer unit test", () => {
    it("should update a customer", async () => {
        const repository = MockRepository()

        const usecase = new UpdateCustomerUseCase(repository)

        const input = {
            id: customer.id,
            name: 'Customer#087 Att',
            address: {
                state: 'state att',
                city: 'city att',
                street: 'street att',
                number: 'number att',
                complement: 'complement att',
                zipCode: 'zipCode att',
            }
        }

        const output = await usecase.execute(input) 

        expect(output).toEqual({
            id: customer.id,
            name: input.name,
            rewardPoints: 0,
            active: false,
            address: input.address
        })
        expect(repository.find).toHaveBeenCalled()

    })

    it("should throw an error when update customer with blank name", async() => {
        const repository = MockRepository()

        const usecase = new UpdateCustomerUseCase(repository)

        const input = {
            id: customer.id,
            name: '',
        }

        expect(async () => {
            await usecase.execute(input) 
        }).rejects.toThrowError("customer: Name is required.")

    })

    it("should throw an error when update customer with invalid address", async() => {
        const repository = MockRepository()

        const usecase = new UpdateCustomerUseCase(repository)

        const input = {
            id: customer.id,
            address: {
                state: 'state att',
                city: 'city att',
                street: 'street att',
                number: 'number att',
                complement: 'complement att',
                zipCode: '',
            }
        }

        expect(async () => {
            await usecase.execute(input) 
        }).rejects.toThrowError("ZipCode is required.")

    })

})