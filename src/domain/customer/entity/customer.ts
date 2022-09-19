import { assign } from "../../../../util/assign";
import Entity from "../../@shared/entity/entity.abstract";
import { NotificationErrorProps } from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../../@shared/value-object/address";
import CustomerValidatorFactory from "../factory/customer.validator.factory";

type CustomerProps = {
    id: string;
    name: string;
    address?: Address;
    active?: boolean;
    rewardPoints?: number;
}

export default class Customer extends Entity {
    private _id: string;
    private _name: string;
    private _address: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0

    constructor(props: CustomerProps){
        super()
        assign(this, props)
        this.validate()
    }

    get name(): string{
        return this._name
    }

    get id(): string{
        return this._id
    }

    get address(): Address{
        return this._address
    }

    get active(): boolean{
        return this._active
    }

    get rewardPoints(): number{
        return this._rewardPoints
    }

    validate(){
        CustomerValidatorFactory.create().validate(this)
        if(this.notification.hasErrors()){
            const error = this.notification.getErrors({
                context:'customer', 
            })
            throw new NotificationError(error as NotificationErrorProps[])
        }
    }

    changeName(name: string){
        this._name = name
        this.validate()
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory.")
        }
        this._active = true
    }

    deactivate(){
        this._active = false
    }

    isActive(): boolean{
        return this._active
    }

    getPoints(): number{
        return this._rewardPoints
    }

    addPoints(points: number){
        this._rewardPoints+=points
    }

    changeAddress(address: Address){
        this._address = address
    }

    
}