export interface InputUpdateProductDto {
    id: string,
    name?: string,
    prices?: {
        id: string,
        label?: string,
        value?: number,
        stock?: number
    }[]
}

export interface OutputUpdateProductDto {
    id: string,
    name: string,
    prices: {
        id: string,
        label: string,
        value: number,
        stock: number
    }[]
}