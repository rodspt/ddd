"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, price) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    get name() {
        return this._name;
    }
    changePrice(price) {
        this._price = price;
        this.validate();
    }
    get price() {
        return this._price;
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._price == undefined || this._price <= 0) {
            throw new Error("Price is less than zero");
        }
        return true;
    }
}
exports.default = Product;
