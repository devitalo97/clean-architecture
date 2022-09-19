import Product from "../entity/product"

type IncreasePrice ={
    products: Product[],
    price_ids: string[],
    percentage: number
}
export default class ProductService {
    static increasePrice(props: IncreasePrice): void{
        props.products.forEach(product => {
            const priceId = product.prices.filter(el => props.price_ids.includes(el.id))
            priceId.length > 0 && (() => {
                product.changePrice({
                    id: priceId[0].id,
                    value: priceId[0].value + (priceId[0].value * props.percentage/100)
                })
            })()
        })
    }
}