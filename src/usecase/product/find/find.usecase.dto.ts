export interface InputFindProductUseCase {
    id: string
}

export interface OutputFindProductUseCase {
    id: string
    name: string
    prices: {
        id: string
        label: string
        value: number
        stock: number
    }[]
}