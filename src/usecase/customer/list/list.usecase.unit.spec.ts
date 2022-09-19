import Address from "../../../domain/@shared/value-object/address"
import Customer from "../../../domain/customer/entity/customer"
import { v4 as uuid } from 'uuid'
import ListCustomerUseCase from "./list.usecase"

const customerOne = new Customer({
    id: uuid(),
    name: 'Customer#09'
})

const customerTwo = new Customer({
    id: uuid(),
    name: 'Customer#09',
    address: new Address({
        state: 'state',
        city: 'city',
        street: 'street',
        number: 'number',
        complement: 'complement',
        zipCode: 'zipCode',
    })
})

const customers = [customerOne, customerTwo]

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(customers)),
    }
}

describe("list customer usecase unit test", () => {
    it("should list customers", async () => {

        const repository = MockRepository()
        
        const usecase = new ListCustomerUseCase(repository)

        const input = {}

        const output = await usecase.execute(input)

        expect(output.customers).toBeDefined()
        expect(output.customers.length).toBe(2)
        expect(output.customers).toStrictEqual(customers.map(customer => ({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.getPoints(),
            address: {
                state: customer?.address?.state,
                city: customer?.address?.city,
                street: customer?.address?.street,
                number: customer?.address?.number,
                complement: customer?.address?.complement,
                zipCode: customer?.address?.zipCode
            }
        })))
    })
})