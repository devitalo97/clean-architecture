import { v4 as uuid } from 'uuid'
import Item from '../entity/item';
import Order from '../entity/order';
import OrderInterface from '../entity/order.interface';

type OrderFactoryProps = {
    customerId: string,
    items: {
        productId: string;
        priceId: string;
        value: number;
        quantity: number
    }[]
}

export default class OrderFactory {
    public static create(input: OrderFactoryProps): OrderInterface {
        return new Order({
            id: uuid(),
            customerId: input.customerId,
            items: input?.items?.map(item => new Item({...item, id: uuid()}))
        })
    }
}