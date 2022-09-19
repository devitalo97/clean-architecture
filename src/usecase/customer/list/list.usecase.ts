import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import * as DTO from './list.usecase.dto'

export default class ListCustomerUseCase {
    private _repository: CustomerRepositoryInterface

    constructor(repository: CustomerRepositoryInterface){
        this._repository = repository
    }

    async execute(input: DTO.InpuListCustomerUseCase): Promise<DTO.OutputListCustomerUseCase>{
        const customers = (await this._repository.findAll()).map(customer => ({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.getPoints(),
            address: {
                state: customer?.address?.state,
                city: customer?.address?.city,
                street: customer?.address?.street,
                number: customer?.address?.number,
                complement: customer?.address?.complement,
                zipCode: customer?.address?.zipCode,
            }
        }))

        return { customers }
    }
}