import Customer from '../../../domain/customer/entity/customer'
import CustomerFactory from '../../../domain/customer/factory/customer.entity.factory'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import * as DTO from './create.usecase.dto'

export default class CreateCustomerUseCase {
    private _repository: CustomerRepositoryInterface

    constructor(repository: CustomerRepositoryInterface){
        this._repository = repository
    }

    async execute(input: DTO.InputCreateCustomerDto): Promise<DTO.OutputCreateCustomerDto> {
        let customer = input.address ? CustomerFactory.create({
            type: 'COMPLETE',
            name: input.name,
            address: input.address
        }) : CustomerFactory.create({
            type: 'BASIC',
            name: input.name,
        })

        await this._repository.create(customer as Customer)

        let result: DTO.OutputCreateCustomerDto = {
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.getPoints(),
        }

        input.address && (result = {...result, address: {
            state: customer?.address?.state,
            city: customer?.address?.city,
            street: customer?.address?.street,
            number: customer?.address?.number,
            complement: customer?.address?.complement,
            zipCode: customer?.address?.zipCode,
        }})

        return result
    }
}