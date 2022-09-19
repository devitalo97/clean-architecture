import Address from "../../@shared/value-object/address";
import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.inteface";
import { v4 as uuid } from 'uuid'

type CustomerFactoryProps = {
    type: string,
    name: string,
    address?: {
        state: string,
        city: string,
        street: string,
        number: string,
        complement: string,
        zipCode: string,
    }
}
export default class CustomerFactory {
    public static create(input: CustomerFactoryProps): CustomerInterface {
        switch(input.type){
            case 'ACTIVATED':
                return new Customer({
                    id: uuid(),
                    name: input.name,
                    active: true
                })
            
            case 'POINTS':
                return new Customer({
                    id: uuid(),
                    name: input.name,
                    rewardPoints: 100
                })

            case 'COMPLETE':
                return new Customer({
                    id: uuid(),
                    name: input.name,
                    address: new Address({...input.address}),
                })
                
            case 'BASIC':
                return new Customer({
                    id: uuid(),
                    name: input.name,
                })
        }
    }
}