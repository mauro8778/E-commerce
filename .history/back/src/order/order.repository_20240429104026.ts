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
            stock: MoreThan(0),
          },
        })
        if (products.length !== productIds.length) {
            throw new Error('Algunos productos no están disponibles o no existen');
        }
        const order = new OrderEntity();
        order.user=user;
        const userOrder= await this.orderRepository.save(order)
            
        const orderDetail: OrderDetailsEntity[] = [];
            let totalPrice=0;
            for(const product of products){
                const neworderDetail = new OrderDetailsEntity();
                neworderDetail.order=userOrder;
                neworderDetail.products=[product];
                neworderDetail.price= product.price;
                totalPrice+=product.price;
                orderDetail.push(neworderDetail)
                
                product.stock=-1;
                await this.productrepository.save(product);
            }
   await this.orderDetailsrepository.save(orderDetail);
   return{
    order:{
        id:order.id,
        totalPrice:totalPrice,
        orderDetail:orderDetail.map(Detail=>({id:Detail.id,price:Detail.price})),
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
