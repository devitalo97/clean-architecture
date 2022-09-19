export interface InputCreateProductUseCase {
    name: string
    prices: {
        label: string
        stock: number
        value: number
    }[]
}

export interface OutputCreateProductUseCase {
    id: string
    name: string
    prices: {
        id: string
        label: string
        stock: number
        value: number
    }[]
}