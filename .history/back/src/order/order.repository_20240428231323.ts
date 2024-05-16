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
export class OrderRepository{
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderDetailsEntity)
        private readonly orderDetailsrepository: Repository<OrderDetailsEntity>,
        @InjectRepository(ProductEntity)
        private readonly productrepository: Repository<ProductEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

   async addOrder(id:string){
        const user= await this.userRepository.findOne({where: {id}});
        
        const order = new OrderEntity();
        order.user=user;
        
   
   
   
    }   
}

  