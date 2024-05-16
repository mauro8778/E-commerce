import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/Products/product.entity';
import { ProductRepository } from 'src/Products/product.repository';
import { UserEntity } from 'src/Users/user.entity';
import { UserRepository } from 'src/Users/user.repository';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    @InjectRepository(ProductEntity)
    private readonly productRepository: ProductRepository,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: OrderRepository,
  ) {}

  async getOrder(userId: string, products: { id: string }[]) {
    const user = await this.userRepository.findOne(userId);
    
    const order = new OrderEntity();
    order.user = userId;
    const saveOrder= await this.orderRepository.save(order);

    let total=0;
    
    for(const productId of productIds){
        const product = await this.productRepository.findOne(productsId)
    if(product&&product.stock>0){
        total+=product.price;
        product.stock= -1;
        await this.productRepository.save(product);    
    }
  }
  order.total=total;
  await this.orderRepository.save(order);
  return {message:"ordern creada exitosamente"}

}

  addOrder() {}
}
