import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    //Tem uma lista eventHandler 
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};
    
    //Retorna a lista
    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    } 

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.getEventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if(this.getEventHandlers[eventName]){
            const index = this.getEventHandlers[eventName].indexOf(eventHandler);
            if(index !== -1){
                this.eventHandlers[eventName].splice(index, 1);
            }
           
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    notify(event: EventInterface): void {
        console.log('aqui');
       
        const eventName = event.constructor.name;
        if (this.eventHandlers[eventName]){
            this.eventHandlers[eventName].forEach((eventHandler)=> {
                eventHandler.handle(event);
            });
        }

    }

 

  
    
}