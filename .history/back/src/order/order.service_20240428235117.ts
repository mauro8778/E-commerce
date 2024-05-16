import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
@Injectable()
export class OrderService {
    constructor() {}

    addOrder() {
        await this.OrderRepository.addOrder();
    }
}
