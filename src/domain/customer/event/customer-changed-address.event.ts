import EventInterface from "../../@shared/event/event.interface";
import Address from "../../@shared/value-object/address";

type CustomerChangedAddressEventProps = {
    dataTimeOccurred?: Date
    eventData: EventDataPros
}

type EventDataPros = {
    address: Address,
    customerId: string,
    customerName: string
}

export default class CustomerChangedAddressEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: EventDataPros;

    constructor(props: CustomerChangedAddressEventProps){
        this.eventData = props.eventData
        this.dataTimeOccurred = new Date()
    }
}