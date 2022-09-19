export interface InputListProductUseCase {}

export interface OutputListProductUseCase {
    products: {
        id: string
        name: string
        prices: {
            id: string
            label: string
            value: number
            stock: number
        }[]
    }[]
}