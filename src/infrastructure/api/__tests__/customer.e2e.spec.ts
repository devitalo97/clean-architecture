import request from 'supertest'
import { AppDataSource } from '../../repository/typeorm/database/data-source'
import { app } from '../app'

describe("E2E customer test", () => {

    beforeEach(async() => {
        await AppDataSource.initialize()
    })

    afterEach(async() => {
        await AppDataSource.destroy()
    })

    it("should create a customer", async () => {
        const body = {
            name: 'Italo de Souza',
            address: {
                state: 'Ceará',
                city: 'Aquiraz',
                street: 'Av das Ubaranas',
                number: '102',
                complement: 'casa',
                zipCode: '52874562'
            }
        }
        const response = await request(app)
            .post('/api/customer')
            .send(body)

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe(body.name)
        expect(response.body.active).toBe(false)
        expect(response.body.rewardPoints).toBe(0)
        expect(response.body.address).toStrictEqual(body.address)
    })

    it("should not create a customer", async () => {
        const body = {
            name: '',
            address: {
                state: 'Ceará',
                city: 'Aquiraz',
                street: 'Av das Ubaranas',
                number: '102',
                complement: 'casa',
                zipCode: '52874562'
            }
        }

        const response = await request(app)
            .post('/api/customer')
            .send(body)

        expect(response.status).toBe(500)
        
    })

    it("should list all customers", async () => {
        const customerOne = {
            name: 'Italo de Souza',
            address: {
                state: 'Ceará',
                city: 'Aquiraz',
                street: 'Av das Ubaranas',
                number: '102',
                complement: 'casa',
                zipCode: '52874562'
            }
        }
        const customerTwo = {
            name: 'Bruna Almeida',
            address: {
                state: 'Ceará',
                city: 'Aquiraz',
                street: 'Av das Ubaranas',
                number: '1058',
                complement: 'casa',
                zipCode: '65329865'
            }
        }

        let body = customerOne
        let response = await request(app)
            .post('/api/customer')
            .send(body)
        expect(response.status).toBe(200)

        body = customerTwo
        response = await request(app)
            .post('/api/customer')
            .send(body)
        expect(response.status).toBe(200)


        response = await request(app)
            .get('/api/customer/list')

        expect(response.status).toBe(200)
        expect(response.body.customers.length >= 2).toBe(true)        
    })
})