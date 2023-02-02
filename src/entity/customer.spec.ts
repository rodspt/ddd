import Customer from "./customer";
import Address from "./address";

describe("Customer unit tests", () => {

    /*it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1);
    });*/

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("","John");

        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123","");

        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123","John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("123","John");
        const address = new Address("Samambaia",123,"72320-541","Brasilia");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should desactivate customer", () => {
        const customer = new Customer("123","John");
        customer.desactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("123","John");
            customer.activate();

        }).toThrowError("Address is mandatory to activate a customer");
    });

});