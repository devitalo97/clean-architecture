import Item from "./item"

export default interface OrderInterface {
    id: string
    customerId: string
    items: Item[]
    getTotal():number
}