import EnviaConsoleLogUmHandler from "./handler/envia-console-log-um.handler"
import { v4 as uuid } from 'uuid'
import CustomerCreatedEvent from "./customer-created.event"
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler"
import CustomerChangedAddressEvent from "./customer-changed-address.event"
import EnviaConsoleLogDoisHandler from "./handler/envia-console-log-dois.handler"
import Address from "../../@shared/value-object/address"
import Customer from "../entity/customer"
import EventDispatcher from "../../@shared/event/event-dispatcher"

describe("customer event dispatcher test", () => {
    it("it should notify customer created event", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandlerOne = new EnviaConsoleLogUmHandler()
        const spyEventHandlerOne = jest.spyOn(eventHandlerOne, "handle") 
        const eventHandlerTwo = new EnviaConsoleLogDoisHandler()
        const spyEventHandlerTwo = jest.spyOn(eventHandlerTwo, "handle") 

        eventDispatcher.register('CustomerCreatedEvent', eventHandlerOne)
        eventDispatcher.register('CustomerCreatedEvent', eventHandlerTwo)

        expect(eventDispatcher.getHandlers('CustomerCreatedEvent').length).toBe(2)
        expect(eventDispatcher.getHandlers("CustomerCreatedEvent")[0]).toMatchObject(eventHandlerOne)
        expect(eventDispatcher.getHandlers("CustomerCreatedEvent")[1]).toMatchObject(eventHandlerTwo)


        const customer = new Customer({
            id: uuid(),
            name: 'Customer#18',
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        const customerCreatedEvent = new CustomerCreatedEvent({
            eventData: customer
        })

        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandlerOne).toHaveBeenCalled()
        expect(spyEventHandlerTwo).toHaveBeenCalled()


    })

    it("should notify change address event", () => {
        const eventDispatcher = new EventDispatcher()

        const eventHandler = new EnviaConsoleLogHandler()
        const spyEventHander = jest.spyOn(eventHandler, 'handle')

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler)

        expect(eventDispatcher.getHandlers('CustomerChangedAddressEvent').length).toBe(1)
        expect(eventDispatcher.getHandlers("CustomerChangedAddressEvent")[0]).toMatchObject(eventHandler)
        
        const customer = new Customer({
            id: uuid(),
            name: 'Customer#19',
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode'
            })
        })

        customer.changeAddress(new Address({
            state: 'Ceará',
            city: 'Fortaleza',
            street: 'Silva Paulet',
            number: '159',
            complement: 'Apartamento',
            zipCode: '61700000'
        }))

        const customerChangeAddressEvent = new CustomerChangedAddressEvent({
            eventData: {
                address: customer.address,
                customerId: customer.id,
                customerName: customer.name
            }
        })

        eventDispatcher.notify(customerChangeAddressEvent)

        expect(spyEventHander).toHaveBeenCalled()

    })
})