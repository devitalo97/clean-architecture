import Price from "../../../domain/product/entity/price";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import * as DTO from './create.usecase.dto'
import { v4 as uuid } from 'uuid'
import ProductFactory from "../../../domain/product/factory/product.entity.factory";

export default class CreateProductUseCase {
    private _repository

    constructor(repository: ProductRepositoryInterface){
        this._repository = repository
    }

    async execute(input: DTO.InputCreateProductUseCase): Promise<DTO.OutputCreateProductUseCase>{
        // const product = new Product({
        //     id: uuid(),
        //     name: input.name,
        //     prices: input?.prices?.map(price => new Price({...price, id: uuid()}))
        // })

        const product = ProductFactory.create({
            type: "A",
            name: input.name,
            prices: input.prices
        })
        
        await this._repository.create(product as Product)

        return {
            id: product.id,
            name: product.name,
            prices: product?.prices?.map(price => ({
                id: price.id,
                label: price.label,
                stock: price.stock,
                value: price.value,
            }))
        }
    }
}