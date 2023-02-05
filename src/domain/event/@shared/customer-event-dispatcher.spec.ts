
import AddressChangedEvent from "../customer/address.changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log2.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events Customer tests", () => {

    it("should register an event handler", ()=> {

        const eventDispatcher1 = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        eventDispatcher1.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher1.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        const consumerCreatedEvent1 = new CustomerCreatedEvent({
            id: "1",
            name: "Rodrigo",
            street: "QR412",
            number: 123,
            zipcode: "72000-000",
            city: "Brasília",
            active: true,
            rewardPoints: 10
        });
        eventDispatcher1.notify(consumerCreatedEvent1);
        expect(spyEventHandler1).toHaveBeenCalled();

        //Evento 2 

        const eventDispatcher2 = new EventDispatcher();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        eventDispatcher2.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher2.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        const consumerCreatedEvent2 = new CustomerCreatedEvent({
            id: "2",
            name: "Rafael",
            street: "QR412",
            number: 123,
            zipcode: "72000-000",
            city: "Brasília",
            active: true,
            rewardPoints: 10
        });
        eventDispatcher2.notify(consumerCreatedEvent2);
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    
    it("should customer update Address event handler", ()=> {
        const eventDispatcher = new EventDispatcher();

        const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

        const spyEnviaConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", enviaConsoleLogHandler);

        expect(
            eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
        ).toMatchObject(enviaConsoleLogHandler);

        const addressChangedEvent = new AddressChangedEvent({
            id: "1",
            name: "Rodrigo",
            address: "QR412, A, 720000, Brasilia",
        });

        eventDispatcher.notify(addressChangedEvent);

        expect(enviaConsoleLogHandler.handle).toHaveBeenCalledWith(addressChangedEvent)
        expect(spyEnviaConsoleLogHandler).toHaveBeenCalled();

    });

});