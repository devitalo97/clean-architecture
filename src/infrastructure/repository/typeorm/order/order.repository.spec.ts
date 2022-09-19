import { v4 as uuid } from 'uuid'
import Item from '../../../../domain/checkout/entity/item'
import Order from '../../../../domain/checkout/entity/order'
import { transform } from '../../../../../util/transform'
// import { AppDataSource } from './database/data-source'
import OrderModel from './order.model'
import OrderRepository from './order.repository'
import { AppDataSource } from '../database/data-source'

describe("order repository test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })

    afterEach(async () => {
        await AppDataSource.destroy()
    })
    
    it("should create a order", async () => {
        const repository = new OrderRepository()
        const order = new Order({
            id: uuid(),
            customerId: uuid(),
            total: 250,
            items: [
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 50
                }),
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 75
                })
            ]
        })

        await repository.create(order)

        const orderInDb = await AppDataSource.getRepository(OrderModel).findBy({
            id: order.id
        })

        expect(orderInDb).toBeDefined()
        expect(orderInDb[0].id).toBe(order.id)
        expect(orderInDb[0].customerId).toBe(order.customerId)
        expect(orderInDb[0].total).toBe(order.getTotal())
        expect(orderInDb[0].items).toStrictEqual(order.items.map(item => ({
            id: item.id,
            priceId: item.priceId,
            productId: item.productId,
            quantity: item.quantity,
            value: item.value,
        })))

    })

    it("should update an order", async () => {
        const repository = new OrderRepository()
        const order = new Order({
            id: uuid(),
            customerId: uuid(),
            total: 350,
            items: [
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 100
                }),
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 75
                })
            ]
        })  
        
        const created = AppDataSource.getRepository(OrderModel).create({
            ...transform(order, 'db'),
            items: order.items.map(item => transform(item, 'db'))
        })
        await AppDataSource.getRepository(OrderModel).save(created)

        order.addItems([
            new Item({
                id: uuid(),
                priceId: uuid(),
                productId: uuid(),
                value: 56,
                quantity: 2
            })
        ])

        await repository.update(order)

        const orderInDb = await AppDataSource.getRepository(OrderModel).findBy({
            id: order.id
        })

        expect(orderInDb).toBeDefined()
        expect(orderInDb[0].id).toBe(order.id)
        expect(orderInDb[0].customerId).toBe(order.customerId)
        expect(orderInDb[0].total).toBe(order.getTotal())
        expect(orderInDb[0].items).toStrictEqual(order.items.map(item => ({
            id: item.id,
            productId: item.productId,
            priceId: item.priceId,
            value: item.value,
            quantity: item.quantity,
        })))
    })

    it("should find a order", async () => {
        const repository = new OrderRepository()
        const order = new Order({
            id: uuid(),
            customerId: uuid(),
            total: 350,
            items: [
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 100
                }),
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 75
                })
            ]
        })  
        
        const created = AppDataSource.getRepository(OrderModel).create({
            ...transform(order, 'db'),
            items: order.items.map(item => transform(item, 'db'))
        })
        await AppDataSource.getRepository(OrderModel).save(created)

        const foundedOrder = await repository.find(order.id)

        expect(foundedOrder).toBeDefined()
        expect(foundedOrder.id).toBe(order.id)
        expect(foundedOrder).toStrictEqual(order)
    })

    it("should find all orders", async () => {
        const repository = new OrderRepository()

        const orderOne = new Order({
            id: uuid(),
            customerId: uuid(),
            total: 350,
            items: [
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 100
                }),
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 75
                })
            ]
        })  

        const orderTwo = new Order({
            id: uuid(),
            customerId: uuid(),
            total: 190,
            items: [
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 50
                }),
                new Item({
                    id: uuid(),
                    priceId: uuid(),
                    productId: uuid(),
                    quantity: 2,
                    value: 45
                })
            ]
        })  
        
        const created = AppDataSource.getRepository(OrderModel).create([
            {
                ...transform(orderOne, 'db'),
                items: orderOne.items.map(item => transform(item, 'db'))
            },
            {
                ...transform(orderTwo, 'db'),
                items: orderTwo.items.map(item => transform(item, 'db'))
            }
        ])

        await AppDataSource.getRepository(OrderModel).save(created)

        const foundedOrders = await repository.findAll()

        expect(foundedOrders).toBeDefined()
        expect(foundedOrders.length >= 2).toBe(true)
    })
})