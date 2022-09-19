import { assign } from "../../../../util/assign"
import Entity from "../../@shared/entity/entity.abstract"
import { NotificationErrorProps } from "../../@shared/notification/notification"
import NotificationError from "../../@shared/notification/notification.error"
import ProductValidatorFactory from "../factory/product.validator.factory"
import Price from "./price"
import ProductInterface from "./product.interface"

type ProductProps = {
    id: string
    prices: Price[]
    name: string
}

export default class Product extends Entity implements ProductInterface {
    private _id: string
    private _prices: Price[]
    private _name: string
    
    constructor(props: ProductProps){
        super()
        assign(this, props)
        this.validate()
    }

    private validate(): void {
        ProductValidatorFactory.create().validate(this)
        if(this.notification.hasErrors()){
            const error = this.notification.getErrors({
                context: 'product', 
            })
            throw new NotificationError(error as NotificationErrorProps[])
        }
    }

    changeName(name: string): void {
        this._name = name
        this.validate()
    }


    changePrice(price: ChangePriceProps){
        const props = Object.keys(price)
        if(!props.includes('id') || price.id.length === 0){
            throw new Error("Price id is required.")
        }
        if(props.length === 4){
            const newPrice = new Price({
                id: price.id,
                label: price.label,
                value: price.value,
                stock: price.stock,
            })
            this._prices = this._prices.filter((el:any)=> el.id !== price.id)
            this._prices.push(newPrice)
            return
        }else if(props.length < 4){
            let priceSelected = this._prices.filter((el: any) => el.id === price.id)
            if(priceSelected.length > 0){
                let curr = priceSelected[0]
                const newPrice = new Price({
                    id: curr.id,
                    label: curr.label,
                    stock: curr.stock,
                    value: curr.value,
                    ...price
                })
                this._prices = this._prices.filter((el: any) => el.id !== price.id)
                this._prices.push(newPrice)
                return
            }
            return
        }
    }

    get name(): string {
        return this._name
    }

    get id(): string {
        return this._id
    }

    get prices(): Price[] {
        return this._prices
    }
}

type ChangePriceProps = {
    id: string,
    label?: string,
    value?: number
    stock?: number,
}