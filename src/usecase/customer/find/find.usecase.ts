import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import * as DTO from './find.usecase.dto'

export default class FindCustomerUseCase {
    private _repository: CustomerRepositoryInterface

    constructor(repository: CustomerRepositoryInterface){
        this._repository = repository
    }

    async execute(input: DTO.InputFindCustomerDto): Promise<DTO.OutputFindCustomerDto> {
        const customer = await this._repository.find(input.id)
        
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