import { v4 as uuid } from 'uuid'
import { transform } from '../../../../../util/transform'
// import { AppDataSource } from './database/data-source'
import Customer from '../../../../domain/customer/entity/customer'
import CustomerRepository from './customer.repository'
import Address from '../../../../domain/@shared/value-object/address'
import CustomerModel from './customer.model'
import { AppDataSource } from '../database/data-source'

describe("order repository test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })

    afterEach(async () => {
        await AppDataSource.destroy()
    })
    
    it("should create a customer", async () => {
        const repository = new CustomerRepository()
        const customer = new Customer({
            id: uuid(),
            name: 'Customer#00',
        })

        await repository.create(customer)

        const customerInDb = await AppDataSource.getRepository(CustomerModel).findBy({
            id: customer.id
        })

        expect(customerInDb).toBeDefined()
        expect(customerInDb[0].id).toBe(customer.id)
        expect(customerInDb[0].name).toBe(customer.name)
        expect(customerInDb[0].active).toBe(customer.isActive())
        expect(customerInDb[0].rewardPoints).toBe(customer.getPoints())
    })

    it('should update a customer', async () => {
        const repository = new CustomerRepository()

        const customer = new Customer({
            id: uuid(),
            name: 'Customer#01',
        })

        const created = AppDataSource.getRepository(CustomerModel).create({
            ...transform(customer, 'db')
        })

        await AppDataSource.getRepository(CustomerModel).save(created)

        customer.changeName('Customer#001')

        const address = {
            state: 'state',
            city: 'city',
            street: 'street',
            number: 'number',
            complement: 'complement',
            zipCode: 'zipCode',
        }
        customer.changeAddress(new Address({...address}))


        await repository.update(customer)

        const customerInDb = await AppDataSource
            .getRepository(CustomerModel)
            .findBy({
                id: customer.id
            })

        expect(customerInDb[0].id).toBe(customer.id)
        expect(customerInDb[0].name).toBe(customer.name)
        expect(customerInDb[0].name).toBe("Customer#001")
        expect(customerInDb[0].address).toStrictEqual(address)
    })

    it("should find a customer by id", async () => {
        const repository = new CustomerRepository();

        const customer = new Customer({
            id: uuid(),
            name: 'Customer#03',
        })

        const created = AppDataSource.getRepository(CustomerModel).create({
            ...transform(customer, 'db'),
            address: transform(customer?.address, 'db')
        })

        await AppDataSource.getRepository(CustomerModel).save(created)

        const foundCustomer = await repository.find(customer.id)

        expect(foundCustomer.id).toBe(customer.id)
        expect(foundCustomer.name).toBe(customer.name)
        expect(foundCustomer.active).toBe(customer.isActive())
        expect(foundCustomer.rewardPoints).toBe(customer.getPoints())
    })

    it("should find all customers", async () => {
        const repository = new CustomerRepository();

        const customerOne = new Customer({
            id: uuid(),
            name: 'Customer#04',
        })

        const customerTwo = new Customer({
            id: uuid(),
            name: 'customer#05',
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        const created = AppDataSource.getRepository(CustomerModel).create([
            {
                ...transform(customerOne, 'db'),
                address: transform(customerOne?.address, 'db')
            },
            {
                ...transform(customerTwo, 'db'),
                address: transform(customerTwo?.address, 'db')
            }
        ])
        
        await AppDataSource.getRepository(CustomerModel).save(created)

        const products = await repository.findAll()
        
        expect(products.length > 2).toBe(true)
    })

    it("should create a customer and find", async () => {
        const repository = new CustomerRepository();

        const customer = new Customer({
            id: uuid(),
            name: 'Customer#03',
        })

        await repository.create(customer)

        const foundCustomer = await repository.find(customer.id)

        expect(foundCustomer.id).toBe(customer.id)
        expect(foundCustomer.name).toBe(customer.name)
        expect(foundCustomer.address).toBeUndefined()
        expect(foundCustomer.active).toBe(customer.isActive())
        expect(foundCustomer.rewardPoints).toBe(customer.getPoints())
    })
})