"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order_item"));
describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new order_1.default("", "123", []);
        }).toThrowError("Id is required");
    });
    it("should throw error when CustomerId is empty", () => {
        expect(() => {
            let order = new order_1.default("123", "", []);
        }).toThrowError("CustomerId is required");
    });
    it("should throw error when item is empty", () => {
        expect(() => {
            let order = new order_1.default("123", "Teste", []);
        }).toThrowError("Item qtd must be greater than 0"); //O nome tem que ser o mesmo do validate da entity
    });
    it("should calculate total", () => {
        const item1 = new order_item_1.default('1', 'item 1', 4, "Prod 123", 2);
        const item2 = new order_item_1.default('2', 'item 2', 200, "Prod 123", 2);
        const order = new order_1.default("123", "Teste", [item1, item2]);
        expect(order.total()).toBe(408);
    });
    it("should check if the qte qtd is greater than 0", () => {
        expect(() => {
            const item1 = new order_item_1.default('1', 'item 1', 4, "Prod 123", 0);
            const order = new order_1.default("123", "Teste", [item1]);
        }).toThrowError("Quantity must be greater than 0");
    });
});
