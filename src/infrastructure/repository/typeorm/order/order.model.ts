import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export default class OrderModel {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    id: string

    @Column()
    customerId: string

    @Column()
    total: number

    @Column()
    items: {
        id: string
        productId: string;
        priceId: string;
        value: number;
        quantity: number
    }[]
}