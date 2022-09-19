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

    it("should create a product", async () => {
        const body = {
            name: 'Product#00',
            prices: [
                {
                    label: 'gg',
                    value: 142.63,
                    stock: 30
                }
            ]
        }
        const response = await request(app)
            .post('/api/product')
            .send(body)

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe(body.name)
        expect(response.body.prices.length).toBe(1)
        expect(response.body.prices[0].label).toBe(body.prices[0].label)
        expect(response.body.prices[0].value).toBe(body.prices[0].value)
        expect(response.body.prices[0].stock).toBe(body.prices[0].stock)
    })

    it("should not create a product", async () => {
        let body = {
            name: '',
            prices: [
                {
                    label: 'gg',
                    value: 142.63,
                    stock: 30
                }
            ]
        }

        let response = await request(app)
            .post('/api/product')
            .send(body)

        expect(response.status).toBe(500)

        body = {
            name: '',
            prices: [
                {
                    label: 'gg',
                    value: 142.63,
                    stock: 30
                },
                {
                    label: 'pp',
                    value: 0,
                    stock: 30
                }
            ]
        }
        
        response = await request(app)
            .post('/api/product')
            .send(body)

        expect(response.status).toBe(500)
        
    })

    it("should list all products", async () => {
        const productOne = {
            name: 'Product#00',
            prices: [
                {
                    label: 'gg',
                    value: 142.63,
                    stock: 30
                }
            ]
        }
        const productTwo = {
            name: 'Product#01',
            prices: [
                {
                    label: 'gg',
                    value: 129.60,
                    stock: 69
                },
                {
                    label: 'pp',
                    value: 77.85,
                    stock: 30
                }
            ]
        }

        let body = productOne
        let response = await request(app)
            .post('/api/product')
            .send(body)
        expect(response.status).toBe(200)

        body = productTwo
        response = await request(app)
            .post('/api/product')
            .send(body)
        expect(response.status).toBe(200)


        response = await request(app)
            .get('/api/product/list')

        expect(response.status).toBe(200)
        expect(response.body.products.length >= 2).toBe(true)        
    })
})