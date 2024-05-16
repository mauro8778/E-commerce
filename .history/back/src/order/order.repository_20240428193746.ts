import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/Products/product.entity';
import { ProductRepository } from 'src/Products/product.repository';
import { UserEntity } from 'src/Users/user.entity';
import { UserRepository } from 'src/Users/user.repository';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(ProductEntity)
    private readonly productRepository: ProductRepository,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(OrderDetailsEntity)
    private readonly orderDetailsRepository: OrderRepository,
  ) {}

  async addOrder(userId: string, products: { id: string }[]) {
    const user = await this.userRepository.getUserRepositoryById(userId);

    const order = new OrderEntity();
    order.user = user;
    const savedOrder = await this.orderRepository.save(order);

    let totalPrice = 0;

    for (const productInfo of products) {
      const product = await this.productRepository.getProductRepositoryById(productInfo.id);
      if (product && product.stock > 0) {
        totalPrice += product.price;
        product.stock -= 1;
        await this.productRepository.save(product);

        const orderDetail = new OrderDetailsEntity();
        orderDetail.order = savedOrder;
        orderDetail.product = product;
        await this.orderDetailsRepository.save(orderDetail);
      }
    }

    savedOrder.totalPrice = totalPrice;
    await this.orderRepository.save(savedOrder);

    return { order: savedOrder, totalPrice };
  }



