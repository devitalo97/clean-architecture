import Price from "../../../../domain/product/entity/price"
import Product from "../../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../../domain/product/repository/product.repository.interface"
import { transform } from "../../../../../util/transform"
// import { AppDataSource } from "./database/data-source"
import ProductModel from "./product.model"
import { AppDataSource } from "../database/data-source"

export default class ProductRepository implements ProductRepositoryInterface {
    private _db

    constructor(){
        this._db = AppDataSource.getMongoRepository(ProductModel)
    }

    async create(entity: Product): Promise<void> {
        const product = this._db.create({
            ...transform(entity, 'db'),
            prices: entity?.prices?.map(price => transform(price, 'db'))
        })
        await this._db.save(product)
    }

    async update(entity: Product): Promise<void> {
        const product = {
            ...transform(entity, 'db'),
            prices: entity?.prices?.map(price => transform(price, 'db'))
        }
        await this._db.update({id: entity.id}, product)
    }

    async find(id: string): Promise<Product> {
        try{
            const product = await this._db.findOneBy({id})
            if(!product){
                throw new Error("Product not found.")
            }
            return new Product({
                id: product.id,
                name: product.name,
                prices: product?.prices.map(price => new Price(price))
            })
        }catch(e: any){
            throw new Error(e)
        }
    }

    async findAll(): Promise<Product[]> {
        return (await this._db.find({})).map(product => new Product({
            ...product,
            prices: product?.prices?.map(price => new Price({...price}))
        }))
    }


}