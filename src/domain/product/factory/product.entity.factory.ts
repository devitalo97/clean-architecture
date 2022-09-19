import Price from "../entity/price"
import Product from "../entity/product"
import ProductB from "../entity/product-b"
import ProductInterface from "../entity/product.interface"
import { v4 as uuid } from 'uuid'

type ProductFactoryProps = {
    type: string
    name: string,
    prices: {
        label: string,
        value: number,
        stock: number,
    }[]
}
export default class ProductFactory {
    public static create(input: ProductFactoryProps): ProductInterface {
        switch(input.type){
            case "A":
                return new Product({
                    id: uuid(),
                    name: input.name,
                    prices: input?.prices?.map((price) => new Price({...price, id: uuid()}))
                })
            
            case "B":
                return new ProductB({
                    id: uuid(),
                    name: input.name,
                    prices: input?.prices?.map((price) => new Price({...price, id: uuid()}))
                })

            default:
                throw new Error('Product type not supported.')
        }
    }
}