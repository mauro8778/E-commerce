import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/Products/product.entity';
import { ProductRepository } from 'src/Products/product.repository';
import { UserEntity } from 'src/Users/user.entity';
import { UserRepository } from 'src/Users/user.repository';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(ProductEntity)
    private readonly productRepository: ProductRepository,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(OrderDetailsEntity)
    private readonly orderDetailsRepository: OrderRepository,
  ) {}

  async getOrder(userId: string, products: { id: string }[]) {
    const user = await this.userRepository.getUserRepositoryById(userId);
    
    const order = new OrderEntity();
    order.user = user;
    
    const createOrder= await this.orderRepository.create(order);
     await this.orderRepository.save(createOrder);

    let total=0;
    
    for(let i;i<products.length;i++){
        const productsId = products[i].id
        const product = await this.productRepository.getProductRepositoryById(productsId)
    if(product&&product.stock>0){
        product.stock=-1
        await this.productRepository.updateProductRepository(product.id,product) 
    }
  }
  order.total = total;
  await this.orderRepository.save(order);
  return {message:"ordern creada exitosamente"}

}

  addOrder() {}
}
