import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    private readonly ordersRepository: Repository<OrdersRepository>,
  ) {}

  getOrders() {
    return this.ordersRepository.find();
  }

  addOrder(order: OrdersRepository) {
    return this.ordersRepository.save(order);
  }
}
