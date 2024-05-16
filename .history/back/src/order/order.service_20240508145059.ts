import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { PartialDto } from './oderdto';
@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async addOrder( id: string, Product: PartialDto[] ) {
        return await this.orderRepository.addOrder(id, Product);
    }
    async getOrder( id: string ) {
        return await this.orderRepository.getOrder( id );
    }   

}
