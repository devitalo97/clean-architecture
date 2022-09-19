import Item from "../../../../domain/checkout/entity/item";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import { transform } from "../../../../../util/transform";
// import { AppDataSource } from "./database/data-source";
import OrderModel from "./order.model";
import { AppDataSource } from "../database/data-source";

export default class OrderRepository implements OrderRepositoryInterface {
    private _db

    constructor(){
        this._db = AppDataSource.getMongoRepository(OrderModel)
    }

    async create(entity: Order): Promise<void> {
        const order = this._db.create({
            ...transform(entity, 'db'),
            items: entity?.items?.map(item => transform(item, 'db')),
            total: entity.getTotal()
        })
        await this._db.save(order)
    }

    async update(entity: Order): Promise<void> {
        const order = {
            ...transform(entity, 'db'),
            items: entity?.items?.map(item => transform(item, 'db'))
        }
        await this._db.update({id: entity.id}, order)
    }

    async find(id: string): Promise<Order> {
        const order = await this._db.findOneBy({id})
        return new Order({
            id: order.id,
            customerId: order.customerId,
            items: order?.items.map(item => new Item(item)),
            total: order.total
        })
    }

    async findAll(): Promise<Order[]> {
        return (await this._db.find({})).map(product => new Order({
            ...product,
            items: product?.items?.map(item => new Item({...item}))
        }))
    }
}