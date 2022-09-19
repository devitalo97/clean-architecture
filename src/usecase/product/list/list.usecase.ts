import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import * as DTO from './list.usecase.dto'

export default class ListProductUseCase {
    private _repository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this._repository = repository
    }

    async execute(input: DTO.InputListProductUseCase): Promise<DTO.OutputListProductUseCase> {
        const products = (await this._repository.findAll()).map(product => ({
            id: product.id,
            name: product.name,
            prices: product?.prices?.map(price => ({
                id: price.id,
                label: price.label,
                value: price.value,
                stock: price.stock,
            })),
        }))

        return { products }
    }
}