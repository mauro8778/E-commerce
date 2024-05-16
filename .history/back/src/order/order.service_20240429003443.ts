import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async addOrder( id: string, productIds: string[] ) {
        await this.orderRepository.addOrder( id, productIds );
    }

    async getOrder( id: string ) {
        return await this.orderRepository.getOrder( id );
    }   
}
