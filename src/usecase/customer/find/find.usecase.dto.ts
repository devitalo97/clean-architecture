export interface InputFindCustomerDto {
    id: string
}

export interface OutputFindCustomerDto {
    id: string
    name: string
    address: {
        state: string
        city: string
        street: string
        number: string
        complement: string
        zipCode: string
    }
    active: boolean
    rewardPoints: number
}