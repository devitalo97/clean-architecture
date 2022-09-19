import { assign } from "../../../../util/assign"

type PriceProps = {
    id: string
    label: string
    stock: number
    value: number
}

export default class Price {
    private _id: string
    private _label: string
    private _stock: number
    private _value: number

    constructor(props: PriceProps){
        assign(this, props)
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get label(): string {
        return this._label
    }

    get stock(): number {
        return this._stock
    }

    get value(): number {
        return this._value
    }

    private validate(): void {
        if(this._value <= 0){
            throw new Error("Value must be valid.")
        }

        if(this._stock <= 0){
            throw new Error("Stock must be valid.")
        }

        if(!this._id || this._id.length === 0){
            throw new Error("Id is required.")
        }

        if(!this._label || this._label.length === 0){
            throw new Error("Label is required.")
        }
    }
}