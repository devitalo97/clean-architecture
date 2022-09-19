export interface InputCreateCustomerDto {
    name: string
    address?: {
        state: string,
        city: string,
        street: string,
        number: string,
        complement: string,
        zipCode: string,
    }
    active?: boolean,
    rewardPoints?: number
}

export interface OutputCreateCustomerDto {
    id: string
    name: string
    address?: {
        state: string,
        city: string,
        street: string,
        number: string,
        complement: string,
        zipCode: string,
    }
    active: boolean,
    rewardPoints: number
}