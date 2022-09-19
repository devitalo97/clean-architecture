import { transform } from "../../../../../util/transform";
// import { AppDataSource } from "./database/data-source";
import CustomerModel from "./customer.model";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/@shared/value-object/address";
import { AppDataSource } from "../database/data-source";

export default class CustomerRepository implements CustomerRepositoryInterface {
    private _db

    constructor(){
        this._db = AppDataSource.getMongoRepository(CustomerModel)
    }

    async create(entity: Customer): Promise<void> {
        const customer = this._db.create({
            ...transform(entity, 'db'),
            address: transform(entity?.address, 'db')
        })
        await this._db.save(customer)
    }

    async update(entity: Customer): Promise<void> {
        const customer = {
            ...transform(entity, 'db'),
            address: transform(entity?.address, 'db')
        }
        await this._db.update({id: entity.id}, customer)
    }

    async find(id: string): Promise<Customer> {
        try{
            const customer = await this._db.findOneBy({id})
            if(!customer){
                throw new Error("Customer not found.")
            }
            return new Customer({
                id: customer.id,
                name: customer.name,
                active: customer.active,
                address: customer.address && new Address(({...customer.address})),
                rewardPoints: customer.rewardPoints,
            })
        }catch(e: any){
            throw new Error(e)
        }
    }

    async findAll(): Promise<Customer[]> {
        return (await this._db.find({})).map(customer => new Customer({
            ...customer,
            address: customer.address && new Address({...customer.address})
        }))
    }
}