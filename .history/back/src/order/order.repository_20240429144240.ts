import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/Products/product.entity';
import { ProductRepository } from 'src/Products/product.repository';
import { UserEntity } from 'src/Users/user.entity';
import { UserRepository } from 'src/Users/user.repository';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import { In, MoreThan, Repository } from 'typeorm';

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

   async addOrder(id: string, productIds: string[]){
        const user= await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        

        const products = await this.productrepository.find( 
        {where: {
            id: In(productIds),
          },
        })
        const hasInvalidStock = products.some(product => product.stock <= 0);

if (hasInvalidStock) {
    throw new Error('hakuna matata');
}
        const order = new OrderEntity();
        order.user=user;
        const userOrder= await this.orderRepository.save(order)
            
        const orderDetail: OrderDetailsEntity[] = [];
            let totalPrice=0;
            for(const product of products){
                const newOrderDetail = new OrderDetailsEntity();
                newOrderDetail.order=userOrder;
                newOrderDetail.products=[product];
                newOrderDetail.price= product.price;
                totalPrice+=newOrderDetail.price;
                orderDetail.push(newOrderDetail)
                
                product.stock = product.stock -1;
                await this.productrepository.save(product);
            }
   await this.orderDetailsrepository.save(orderDetail);
   return{
    order: {
        id: userOrder.id,
        totalPrice: totalPrice,
        orderDetail: orderDetail.map(detail => ({ id: detail.id, price: detail.price }))
    }
    } 
}
    
    async getOrder(id:string ) {
const order= await this.orderRepository.findOne({ where: { id } });
const orderDetail= await this.orderDetailsrepository.find( 
    {
        where: { order: { id: id } },
        relations: ['products'],    
    
    }
)
return{
    order:{
        id:order.id,
        orderDetail:orderDetail.map(Detail=>({id:Detail.id,price:Detail.price})),
        total:orderDetail.reduce((acc,cur)=>acc+cur.price,0)
    }
}
    }
}   
