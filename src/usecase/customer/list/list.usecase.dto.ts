export interface InpuListCustomerUseCase {}

export interface OutputListCustomerUseCase {
    customers: {
        id: string
        name: string,
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
    }[]
}