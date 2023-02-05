import EventInterface from "../@shared/event.interface";


export default class AddressChangedEvent implements EventInterface{
    dataTimeOccurred: Date;
    eventData: {
        id: string,
        name: string,
        address: string
    };

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}