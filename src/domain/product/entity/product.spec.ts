import Price from "./price"
import Product from "./product"
import { v4 as uuid } from 'uuid'

describe("product entity unit test", () => {
    it("should throw an error when id is empty", () => {
        expect(() => {
            const product = new Product({
                id: "",
                name: "Product#00",
                prices: [
                    new Price({
                        id: uuid(),
                        label: 'price one',
                        stock: 65,
                        value: 963.65,
                    }),
                    new Price({
                        id: uuid(),
                        label: 'price two',
                        stock: 98,
                        value: 889.77,
                    })
                ]
            })
        }).toThrowError("product: Id is required.")
    })

    it("should throw an error when name is empty", () => {
        expect(() => {
            const product = new Product({
                id: uuid(),
                name: "",
                prices: [
                    new Price({
                        id: uuid(),
                        label: 'price one',
                        stock: 77,
                        value: 654.96,
                    }),
                    new Price({
                        id: uuid(),
                        label: 'price two',
                        stock: 12,
                        value: 786.65,
                    })
                ]
            })
        }).toThrowError("product: Name is required.")
    })

    it("should throw an error when name and id are empty", () => {
        expect(() => {
            const product = new Product({
                id: "",
                name: "",
                prices: [
                    new Price({
                        id: uuid(),
                        label: 'price one',
                        stock: 77,
                        value: 654.96,
                    }),
                    new Price({
                        id: uuid(),
                        label: 'price two',
                        stock: 12,
                        value: 786.65,
                    })
                ]
            })
        }).toThrowError("product: Id is required., Name is required.")
    })

    it("should throw an error when price is empty", () => {
        expect(() => {
            const product = new Product({
                id: uuid(),
                name: "Product#03",
                prices: []
            })
        }).toThrowError("product: Price is required.")
    })

    it("should throw an error when price is invalid", () => {
        expect(() => {
            const product = new Product({
                id: uuid(),
                name: "Product#02",
                prices: [
                    // @ts-expect-error force entity accept wrong type of data
                    {
                        id: uuid(),
                        label: 'price one',
                        stock: 32,
                        value: 1050.32,
                    },
                    new Price({
                        id: uuid(),
                        label: 'price two',
                        stock: 105,
                        value: 889.77,
                    })
                ]
            })
        }).toThrowError("Price is required.")
    })

    it("should change name", () => {
        //arrange
        const product = new Product({
            id: uuid(),
            name: "Product#03",
            prices: [
                new Price({
                    id: uuid(),
                    label: 'price one',
                    stock: 54,
                    value: 774.66,
                }),
                new Price({
                    id: uuid(),
                    label: 'price two',
                    stock: 12,
                    value: 999.99,
                })
            ]
        })

        //act
        product.changeName("Product#04")

        //assert
        expect(product.name).toBe("Product#04")
    })

    it("should change stock number of price", () => {
        //arrange
        const product = new Product({
            id: uuid(),
            name: "Product#03",
            prices: [
                new Price({
                    id: uuid(),
                    label: 'price one',
                    stock: 54,
                    value: 774.66,
                }),
                new Price({
                    id: uuid(),
                    label: 'price two',
                    stock: 12,
                    value: 999.99,
                })
            ]
        })

        //act
        const priceId = product.prices[0].id
        product.changePrice({
            id: priceId, 
            stock: 96
        })

        //assert
        expect(product.prices.filter(el => el.id === priceId)[0].stock).toBe(96)
    })

    it("should change value number of price", () => {
        //arrange
        const product = new Product({
            id: uuid(),
            name: "Product#03",
            prices: [
                new Price({
                    id: uuid(),
                    label: 'price one',
                    stock: 54,
                    value: 774.66,
                }),
                new Price({
                    id: uuid(),
                    label: 'price two',
                    stock: 12,
                    value: 999.99,
                })
            ]
        })

        //act
        const priceId = product.prices[0].id
        product.changePrice({
            id: priceId, 
            value: 1236.78
        })

        //assert
        expect(product.prices.filter(el => el.id === priceId)[0].value).toBe(1236.78)
    })

    it("should change value number of price without price id", () => {
        //arrange
        const product = new Product({
            id: uuid(),
            name: "Product#03",
            prices: [
                new Price({
                    id: uuid(),
                    label: 'price one',
                    stock: 54,
                    value: 774.66,
                }),
                new Price({
                    id: uuid(),
                    label: 'price two',
                    stock: 12,
                    value: 999.99,
                })
            ]
        })

        //assert
        expect(() => {
            product.changePrice({
                id: "", 
                value: 1236.78
            })
        }).toThrowError("Price id is required.")
    })

})