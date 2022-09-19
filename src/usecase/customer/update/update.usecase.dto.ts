export interface InputUpdateCustomerDto {
    id: string
    name?: string
    address?: {
        state: string
        city: string
        street: string
        number: string
        complement: string
        zipCode: string
    }
    active?: boolean
    rewardPoints?: number
}

export interface OutputUpdateCustomerDto {
    id: string
    name: string
    address?: {
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