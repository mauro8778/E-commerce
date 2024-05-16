import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailsEntity } from './orderDetail.entity';
import { UserEntity } from '../Users/user.entity';
import { ProductEntity } from '../Products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../Products/product.repository';
import { UserRepository } from '../Users/user.repository';
import { CategoryEntity } from '../category/category.entity';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ OrderEntity,OrderDetailsEntity,UserEntity,CategoryEntity ,ProductEntity])],
  providers: [OrderService,OrderRepository,ProductRepository,UserRepository],
  controllers: [OrderController]
})
export class OrderModule {}
