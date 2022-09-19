import { assign } from '../../../../util/assign'

type ItemProps = {
    id: string
    productId: string;
    priceId: string;
    value: number;
    quantity: number
}

export default class Item {
    private _id: string
    private _productId: string
    private _priceId: string
    private _value: number;
    private _quantity: number;

    constructor(props: ItemProps){
        assign(this, props)
        this.validate()
    }

    get id(): string{
        return this._id
    }

    get productId(): string{
        return this._productId
    }

    get priceId(): string{
        return this._priceId
    }

    get value(): number{
        return this._value
    }

    get quantity(): number{
        return this._quantity 
    }

    getValue(): number {
        return this._value * this._quantity
    }

    private validate(){
        if(this._quantity <= 0){
            throw new Error("Quantity must be grather than zero.")
        }
    }


}