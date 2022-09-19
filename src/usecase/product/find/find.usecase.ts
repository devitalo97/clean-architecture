import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import * as DTO from './find.usecase.dto'

export default class FindProductUseCase {
    private _repository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this._repository = repository
    }

    async execute(input: DTO.InputFindProductUseCase): Promise<DTO.OutputFindProductUseCase>{
        const product = await this._repository.find(input.id)
        return {
            id: product.id,
            name: product.name,
            prices: product?.prices?.map(price => ({
                id: price.id,
                label: price.label,
                value: price.value,
                stock: price.stock,
            }))
        }
    }
}