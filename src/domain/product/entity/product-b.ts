import { assign } from "../../../../util/assign"
import Entity from "../../@shared/entity/entity.abstract"
import { NotificationErrorProps } from "../../@shared/notification/notification"
import NotificationError from "../../@shared/notification/notification.error"
import Price from "./price"
import ProductInterface from "./product.interface"

type ProductProps = {
    id: string
    prices: Price[]
    name: string,
    variant?: string
}

type ChangePriceProps = {
    id: string,
    label?: string,
    value?: number
    stock?: number,
}

export default class ProductB extends Entity implements ProductInterface {
    private _id: string
    private _prices: Price[]
    private _name: string
    private _variant: string
    
    constructor(props: ProductProps){
        super()
        assign(this, props)
        this.validate()
    }

    private validate(): void {
        if(this._id.length === 0 || !this._id){
            this.notification.addError({
                context: "product",
                message: "Id is required."
            })
        }
        if(this._name.length === 0 || !this._name){
            this.notification.addError({
                context: "product",
                message: "Name is required."
            })
        }
        if(this._prices.length === 0 || this._prices.some(price => price instanceof Price === false)){
            this.notification.addError({
                context: "product",
                message: "Price is required."
            })
        }
        if(this.notification.hasErrors()){
            const error = this.notification.getErrors({
                context:'product', 
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
            this._prices = this._prices.filter((el:any)=> el.id !== price.id)
            this._prices.push(new Price({...price as any}))
        }else if(props.length < 4){
            let priceSelected = this._prices.filter((el: any) => el.id === price.id)
            if(priceSelected.length > 0){
                let curr = priceSelected[0]
                curr = new Price({
                    label: curr.label,
                    stock: curr.stock,
                    value: curr.value,
                    ...price
                })
                this._prices = this._prices.filter((el: any) => el.id !== price.id)
                this._prices.push(curr)
            }
        }
    }

    get name(): string {
        return this._name
    }

    get id(): string {
        return this._id
    }

    get variant(): string {
        return this._variant
    }

    get prices(): Price[] {
        return this._prices
    }
}

