import Customer from "../../customer/entity/customer";
import Item from "../entity/item";
import Order from "../entity/order";
import { v4 as uuid } from 'uuid'

export default class OrderService {
    static total(props: Order[]): number{

        return props.reduce((output, input) => {
            return output + input.getTotal()
        }, 0)

    }


    static placeOrder(props: {customer: Customer, items: Item[]}): Order{
        const order = new Order({
            id: uuid(),
            customerId: props.customer.id,
            items: props.items
        })


        props.customer.addPoints(order.getTotal()/2)

        return order
    }
}