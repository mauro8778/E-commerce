import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { PartialDto } from './oderdto';
@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async addOrder( id: string, Product: PartialDto[] ) {
        const order = await this.orderRepository.addOrder(id, Product);
    return order;
    }

    async getOrder( id: string ,user:any) {
        return await this.orderRepository.getOrder( id,user );
    }   
}
