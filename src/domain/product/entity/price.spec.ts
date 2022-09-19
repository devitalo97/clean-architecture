import Price from "./price"
import { v4 as uuid } from 'uuid'

describe("price entity unit test", () => {
    it("should throw an error when price value is invalid", () => {
        expect(() => {
            const price = new Price({
                id: uuid(),
                label: 'label',
                stock: 55,
                value: 0
            })
        }).toThrowError("Value must be valid.")

        expect(() => {
            const price = new Price({
                id: uuid(),
                label: 'label',
                stock: 55,
                value: -50
            })
        }).toThrowError("Value must be valid.")
    })

    it("should throw an error when price stock is invalid", () => {
        expect(() => {
            const price = new Price({
                id: uuid(),
                label: 'label',
                stock: 0,
                value: 98.90
            })
        }).toThrowError("Stock must be valid.")

        expect(() => {
            const price = new Price({
                id: uuid(),
                label: 'label',
                stock: -993,
                value: 21.55
            })
        }).toThrowError("Stock must be valid.")
    })

    it("should throw an error when price label is empty", () => {
        expect(() => {
            const price = new Price({
                id: uuid(),
                label: '',
                stock: 60,
                value: 98.90
            })
        }).toThrowError("Label is required.")

        expect(() => {
            const price = new Price({
                id: uuid(),
                label: '',
                stock: 993,
                value: 21.55
            })
        }).toThrowError("Label is required.")       
    })

    it("should throw an error when price id is empty", () => {
        expect(() => {
            const price = new Price({
                id: "",
                label: 'label',
                stock: 65,
                value: 98.90
            })
        }).toThrowError("Id is required.")

        expect(() => {
            const price = new Price({
                id: "",
                label: 'label',
                stock: 993,
                value: 21.55
            })
        }).toThrowError("Id is required.")
    })
})