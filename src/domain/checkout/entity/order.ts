import { assign } from "../../../../util/assign";
import Item from "./item";

type OrderProps = {
    id: string,
    customerId: string,
    items: Item[],
    total?: number
}

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: Item[];
    private _total: number;

    constructor(props: OrderProps){
        assign(this, props)
        this.validate()
        this._total = this.getTotal()
    }

    get id(): string{
        return this._id
    }

    get customerId(): string{
        return this._customerId
    }

    get items(): Item[]{
        return this._items
    }

    get total(): number{
        this.getTotal()
        return this._total
    }

    getTotal(): number {
        const total =  this._items.reduce(
            (output, input) => output + input.getValue(), 0
        ) 
        this._total = total
        return total
    }

    addItems(items: Item[]){
        this._items = [...this._items, ...items]
        this.getTotal()
    }

    validate(): void {
        if(this._id.length === 0){
            throw new Error("Id is required.")
        }

        if(this._customerId.length === 0){
            throw new Error("Costumer Id is required.")
        }

        if(this._items.length === 0){
            throw new Error("Items are required.")
        }

        if(this._items.some((item: any) => item.quantity <= 0)){
            throw new Error("Quantity must be grather than zero.")
        }
    }
}