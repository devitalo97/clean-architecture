import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export default class CustomerModel {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    id: string

    @Column()
    name: string

    @Column()
    rewardPoints: number

    @Column()
    active: boolean

    @Column()
    address: {
        state: string
        city: string
        street: string
        number: string
        complement: string
        zipCode: string
    }
}