import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
          {
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
              id: item.id,
              product_id: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          },
          {
            include: [{ model: OrderItemModel }],
          }
        );
      }
 
     async update(entity: Order): Promise<void>{
        const orderItemsModel = await OrderItemModel.findAll({
            where: { order_id: entity.id },
          });
      
          orderItemsModel.forEach((orderItem) => {
            const itemEntity = entity.items.find((item) => item.id === orderItem.id);
            if (!itemEntity) {
              OrderItemModel.destroy({ where: { id: orderItem.id } });
      
              return;
            }
      
            if (itemEntity.quantity !== orderItem.quantity) {
              OrderItemModel.update(
                { quantity: itemEntity.quantity },
                { where: { id: itemEntity.id } }
              );
            }
          });
      
          entity.items.forEach((item) => {
            const itemModel = orderItemsModel.find(
              (orderItem) => orderItem.id === item.id
            );
            if (!itemModel) {
              OrderItemModel.create({
                id: item.id,
                order_id: entity.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              });
            }
          });
      
          OrderModel.update({ total: entity.total() }, { where: { id: entity.id } });
     }
 
     async find(orderId: string): Promise<Order>{

          const orderModel = await OrderModel.findOne({
            where: { id: orderId},
            include: ["items"]
        });

          let items: OrderItem[] = [];
          if (orderModel.items.length) {
            items = orderModel.items.map((item) => {
              return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              );
            });
          }
         return new Order(orderModel.id, orderModel.customer_id, items);
     }
 
     async findAll(): Promise<Order[]>{

         const orderModel = await OrderModel.findAll({
          include: ["items"]
        });

        const orders = orderModel.map((orders) => {
          const items = orders.items.map((item) => {
             return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
          });
          
          return  new Order(orders.id, orders.customer_id, items);
        });

        return orders;
     }
}