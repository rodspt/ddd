"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._name = "";
        this._active = false;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get name() {
        return this._name;
    }
    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }
    isActive() {
        return this._active;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }
    desactivate() {
        this._active = false;
    }
    set Address(address) {
        this._address = address;
    }
}
exports.default = Customer;
