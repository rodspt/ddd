"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./customer"));
const address_1 = __importDefault(require("./address"));
describe("Customer unit tests", () => {
    /*it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1);
    });*/
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John");
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it("should change name", () => {
        const customer = new customer_1.default("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });
    it("should activate customer", () => {
        const customer = new customer_1.default("123", "John");
        const address = new address_1.default("Samambaia", 123, "72320-541", "Brasilia");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("should desactivate customer", () => {
        const customer = new customer_1.default("123", "John");
        customer.desactivate();
        expect(customer.isActive()).toBe(false);
    });
    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new customer_1.default("123", "John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
});
