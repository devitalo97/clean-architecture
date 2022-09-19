import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

type CustomerCreatedEventProps = {
    dataTimeOccurred?: Date,
    eventData: Customer
}
export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: Customer;

    constructor(props: CustomerCreatedEventProps){
        this.eventData = props.eventData
        this.dataTimeOccurred = new Date()
    }
}