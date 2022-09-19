import EventInterface from "../../@shared/event/event.interface";
import Product from "../entity/product";

type ProductCreatedEventProps = {
    dataTimeOccurred?: Date;
    eventData: Product;
}

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: Product;

    constructor(props: ProductCreatedEventProps){
        this.eventData = props.eventData
        this.dataTimeOccurred = new Date()
    }
}