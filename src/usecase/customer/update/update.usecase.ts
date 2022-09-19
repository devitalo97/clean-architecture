import Address from "../../../domain/@shared/value-object/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import * as DTO from './update.usecase.dto'

export default class UpdateCustomerUseCase {
    private _repository: CustomerRepositoryInterface

    constructor(repository: CustomerRepositoryInterface){
        this._repository = repository
    }

    async execute(input:DTO.InputUpdateCustomerDto): Promise<DTO.OutputUpdateCustomerDto>{
        const customer = await this._repository.find(input.id)
        
        input.hasOwnProperty('name') && customer.changeName(input.name)
        input.hasOwnProperty('address') && customer.changeAddress(new Address(input.address))

        await this._repository.update(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                state: customer?.address?.state,
                city: customer?.address?.city,
                street: customer?.address?.street,
                number: customer?.address?.number,
                complement: customer?.address?.complement,
                zipCode: customer?.address?.zipCode,
            },
            active: customer.isActive(),
            rewardPoints: customer.getPoints()
        }
    }
}