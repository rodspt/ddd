import EventInterface from "./event.interface";

//O tipo generico T é um EventInterface e o valor padrão é um EventInterface
export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {

    handle(event: T): void;
}