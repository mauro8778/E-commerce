import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../Products/product.entity';
import { UserEntity } from '../Users/user.entity';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import { CreateCollectionOptions, Repository } from 'typeorm';
import { CreateOrderDto, PartialDto } from './oderdto';

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

  async getOrder(id: string): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }
}
