import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor( private readonly ordersRepository: OrdersRepository) {}

    getOrders() {
        return this.ordersRepository.getOrders();
    }

    addOrder(order: OrdersRepository) {
        return this.ordersRepository.addOrder(order);   
    
    }
}
