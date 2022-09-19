import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import * as DTO from './update.usecase.dto'

export default class UpdateProductUseCase {
    private _repository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface){
        this._repository = repository
    }

    async execute(input: DTO.InputUpdateProductDto): Promise<DTO.OutputUpdateProductDto>{
        const product = await this._repository.find(input.id)

        input.hasOwnProperty("name") && product.changeName(input.name)
        input.hasOwnProperty("prices") && input?.prices?.forEach(price => product.changePrice(price))

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