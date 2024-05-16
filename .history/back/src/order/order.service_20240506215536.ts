import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { PartialDto } from './oderdto';
import { UserEntity } from 'src/Users/user.entity';
@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async addOrder( id: string, Product: PartialDto[] ) {
        const order = await this.orderRepository.addOrder(id, Product);
    return order;
    }

    async GetAllOrders( user:UserEntity ) {
        
      
        return await this.orderRepository.GetAllOrders( user);}

    async getOrder( id: string ) {
        return await this.orderRepository.getOrder( id );
    }   

}
