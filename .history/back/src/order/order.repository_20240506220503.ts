import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../Products/product.entity';
import { UserEntity } from '../Users/user.entity';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import {  Repository } from 'typeorm';
import {  PartialDto } from './oderdto';
import { Role } from 'src/Users/user.enum';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailsEntity)
    private readonly orderDetailsrepository: Repository<OrderDetailsEntity>,
    @InjectRepository(ProductEntity)
    private readonly productrepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addOrder(id: string, Products: PartialDto[]) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    const order = new OrderEntity();
    order.user = user;
    order.date = new Date();
    const newOrder = await this.orderRepository.save(order);

    let totalPrice = 0;

    const productPromises = Products.map(async (element) => {
      try {
        const product = await this.productrepository.findOne({
          where: { id: element.id },
        });
        if (!product || product.stock < 1) {
          throw new NotFoundException(
            `Product no existe o no tiene stock`,
          );
        }

        totalPrice += product.price;

        await this.productrepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      } catch (error) {
        return null;
      }
    });

    const products = await Promise.all(productPromises);

    const orderDetail = new OrderDetailsEntity();
    orderDetail.order = newOrder;
    orderDetail.products = products;
    orderDetail.TotalPrice = totalPrice;

    await this.orderDetailsrepository.save(orderDetail);

    return await this.orderRepository.findOne({
      where: { id: newOrder.id },
      relations: [
        'user',
        'orderDetails',
        'orderDetails.products',
        'orderDetails.products.category',
      ],
      select: {
        id: true,
        date: true,

        user: {
          id: true,
          name: true,
        },
        orderDetails: {
          id: true,
          TotalPrice: true,
          products: {
            id: true,
            name: true,
            price: true,
            category: {
              name: true,
            },
          },
        },
      },
    });
  }

  async GetAllOrders(user:UserEntity):Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      relations:['orderDetails', 'orderDetails.products']});

      const users= await this.userRepository.findOne( { where: { id:user.id } } );
      if(users.IsAdmin==true){
        return orders
      }
console.log('orders',orders)
      const newOrder= orders.filter((order) => order.user.id === user.id);
    
      console.log('NEWORDERS',newOrder)
    return newOrder
    }

  async getOrder(id: string): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }

}
