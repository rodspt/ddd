import OrderItem from "./order_item";

export default class Order {

    _id: string;
    _customerId: string;
    _items: OrderItem[];
    _total: number;

    constructor(id: string, customerId: string,  items: OrderItem[]) {
        this._id = id;
        this._customerId  = customerId;
        this._items = items;
        this.validate();
        this._total = this.total();
    }

    validate(): boolean {
        if(this._id.length === 0){
            throw new Error("Id is required");
        }
        if(this._customerId.length === 0){
            throw new Error("CustomerId is required");
        }
        if(this._items.length === 0){
            throw new Error("Item qtd must be greater than 0");
        }

        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

}