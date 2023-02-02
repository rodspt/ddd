import Order from "./order";

describe("Order unit tests", () => {


    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("","123",[]);

        }).toThrowError("Id is required");
    });

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("123","",[]);
        }).toThrowError("CustomerId is required");
    });

});