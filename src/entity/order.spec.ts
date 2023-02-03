import Order from "./order";
import OrderItem from "./order_item";

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


    it("should throw error when item is empty", () => {
         expect(() => {
            let order = new Order("123","Teste",[]);
        }).toThrowError("Item qtd must be greater than 0"); //O nome tem que ser o mesmo do validate da entity
    });

    it("should calculate total", () => {
          const item1 = new OrderItem('1','item 1', 4);
          const item2 = new OrderItem('2','item 2', 200);
          const order = new Order("123","Teste",[item1, item2]);
          expect(order.total()).toBe(204);
   });
    
});