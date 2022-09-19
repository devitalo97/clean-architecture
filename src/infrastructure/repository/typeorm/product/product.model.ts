import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from 'mongodb'

@Entity()
export default class ProductModel {

    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    id: string

    @Column()
    name: string

    @Column()
    prices: {
        id: string
        label: string
        stock: number
        value: number
    }[]

}