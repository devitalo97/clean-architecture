import { assign } from "../../../../util/assign";

type AddressProps = {
    state: string;
    city: string;
    street: string;
    number: string;
    complement: string;
    zipCode: string;
}

export default class Address {
    private _state: string;
    private _city: string;
    private _street: string;
    private _number: string;
    private _complement: string;
    private _zipCode: string;

    constructor(props: AddressProps){
        assign(this, props)
        this.validate()
    }


    get state(): string{
        return this._state
    }

    get city(): string{
        return this._city
    }

    get street(): string{
        return this._street
    }

    get number(): string{
        return this._number
    }

    get complement(): string{
        return this._complement
    }

    get zipCode(): string{
        return this._zipCode
    }

    private validate(){
        if(!this._state || this._state.length === 0){
            throw new Error("State is required.")
        }

        if(!this._city || this._city.length === 0){
            throw new Error("City is required.")
        }

        if(!this._street || this._street.length === 0){
            throw new Error("Street is required.")
        }

        if(!this._number || this._number.length === 0){
            throw new Error("Number is required.")
        }

        if(!this._complement || this._complement.length === 0){
            throw new Error("Complement is required.")
        }

        if(!this._zipCode || this._zipCode.length === 0){
            throw new Error("ZipCode is required.")
        }
    }
}