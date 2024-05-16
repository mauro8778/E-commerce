import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/Products/product.entity';
import { ProductRepository } from 'src/Products/product.repository';
import { UserEntity } from 'src/Users/user.entity';
import { UserRepository } from 'src/Users/user.repository';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(ProductEntity)
    private readonly productRepository: ProductRepository,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailsEntity)
    private readonly orderDetailsRepository: Repository<OrderDetailsEntity>,
  ) {}

  async addOrder(userId: string, products: { id: string }[]) {
    let totalPrice = 0;
    const user = await this.userRepository.getUserRepositoryById(userId);

    const order = new OrderEntity();
    order.user = user;
    const savedOrder = await this.orderRepository.save(order);

    

    for (const productData of products) {
        const product = await this.productRepository.getProductRepositoryById(productData.id);
        if (product && product.stock > 0) {
          totalPrice += product.price;
          product.stock -= 1;
          await this.productRepository.save(product);
  
          const orderDetail = new OrderDetailsEntity();
          orderDetail.order = savedOrder;
          orderDetail.products = [product]; 
          await this.orderDetailsRepository.save(orderDetail);
        }
      }
  
      savedOrder.totalPrice = totalPrice;
      await this.orderRepository.save(savedOrder);
  
      return savedOrder;
    }
  }