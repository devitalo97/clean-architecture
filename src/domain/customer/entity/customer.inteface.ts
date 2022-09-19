export default interface CustomerInterface {
    name: string,
    id: string,
    isActive():boolean
    getPoints():number
    address: {
        state: string,
        city: string,
        street: string,
        number: string,
        complement: string,
        zipCode: string,
    }
}