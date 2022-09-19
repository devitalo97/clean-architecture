import Price from "./price";

export default interface ProductInterface {
    get id():string
    get name():string
    get prices():Price[]
}