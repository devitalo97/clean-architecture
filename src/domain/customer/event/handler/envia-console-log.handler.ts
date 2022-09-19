import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: CustomerChangedAddressEvent){
        console.log(`
            Endereço do cliente: 
                ${event.eventData.customerId}, 
                ${event.eventData.customerName}
            alterado para: 
                ${event.eventData.address.state},
                ${event.eventData.address.city}, 
                ${event.eventData.address.street},
                ${event.eventData.address.number},
                ${event.eventData.address.complement},
                ${event.eventData.address.zipCode}
            }`
        )
    }
}