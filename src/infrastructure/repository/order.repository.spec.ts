import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import { OrderModel } from "../db/sequelize/model/order.model";
import CustomerModel from "../db/sequelize/model/customer.model";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerId", "Customer name");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("productId", "Product name", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("orderItemId", product.name, product.price,product.id, 2 );

    const order = new Order("orderId", "customerId", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "orderId",
      customer_id: "customerId",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          order_id: "orderId",
          product_id: "productId",
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      ],
    });
  });


  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer name");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Product 1", 10);
    await productRepository.create(product1);
    const product2 = new Product("product2", "Product 2", 20);
    await productRepository.create(product2);
    const product3 = new Product("product3", "Product 3", 30);
    await productRepository.create(product3);

    const item1 = new OrderItem( "item1", product1.name,  product1.price,   product1.id,  1 );
    const item2 = new OrderItem( "item2", product2.name,  product2.price,   product2.id,  2 );
    const item3 = new OrderItem( "item3", product3.name,  product3.price,   product3.id,  3 );

    const order = new Order("order1", "customer1", [item1, item2, item3]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.deleteItems([item2.id]);

    await orderRepository.update(order);

    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "order1",
      customer_id: "customer1",
      total: order.total(),
      items: [
        {
          id: item1.id,
          order_id: "order1",
          product_id: "product1",
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
        },
        {
          id: item3.id,
          order_id: "order1",
          product_id: "product3",
          name: item3.name,
          price: item3.price,
          quantity: item3.quantity,
        },
      ],
    });

    order.addItems([item2]);

    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "order1",
      customer_id: "customer1",
      total: order.total(),
      items: [
        {
          id: item1.id,
          order_id: "order1",
          product_id: "product1",
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
        },
        {
          id: item3.id,
          order_id: "order1",
          product_id: "product3",
          name: item3.name,
          price: item3.price,
          quantity: item3.quantity,
        },
        {
          id: item2.id,
          order_id: "order1",
          product_id: "product2",
          name: item2.name,
          price: item2.price,
          quantity: item2.quantity,
        },       
      ],
    });

    item3.changeQuantity(4);

    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "order1",
      customer_id: "customer1",
      total: 170,
      items: [
        {
          id: item1.id,
          order_id: "order1",
          product_id: "product1",
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
        },
        {
          id: item3.id,
          order_id: "order1",
          product_id: "product3",
          name: item3.name,
          price: item3.price,
          quantity: 4,
        },
        {
          id: item2.id,
          order_id: "order1",
          product_id: "product2",
          name: item2.name,
          price: item2.price,
          quantity: item2.quantity,
        },
      ],
    });
  });


  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer 1");
    const address = new Address("Street", 1, "postalCode", "City name");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("product1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("orderItem1", product.name, product.price, product.id, 2 );
    const order = new Order("order1", "customer1", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(order).toStrictEqual(orderResult);
  });


  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("customer1", "Customer 1");
    const address1 = new Address("Street1", 1, "postalCode1", "City name 1");
    customer1.changeAddress(address1);
    customer1.activate();
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Product 1", 10);
    await productRepository.create(product1);
    const orderItem1 = new OrderItem("orderItem1",product1.name,product1.price,product1.id,2);

    const product2 = new Product("product2", "Product 2", 20);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem("orderItem2", product2.name, product2.price, product2.id,1);

    const product3 = new Product("product3", "Product 3", 40);
    await productRepository.create(product3);
    const orderItem3 = new OrderItem("orderItem3", product3.name, product3.price, product3.id,3);

    const order1 = new Order("order1", "customer1", [orderItem1]);
    const order2 = new Order("order2", "customer1", [ orderItem2, orderItem3]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order2);
    expect(orders).toContainEqual(order1);
  });
  


});