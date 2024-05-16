import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    private readonly ordersRepository: Repository<OrdersRepository>,
  ) {}

  getOrders() {
  }

  async addOrder(){}
}
