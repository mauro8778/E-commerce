import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import { UserEntity } from 'src/Users/user.entity';
import { ProductEntity } from 'src/Products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/Products/product.repository';
import { UserRepository } from 'src/Users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ OrderEntity,OrderDetailsEntity,UserEntity,ProductEntity])],
  providers: [OrderService,ProductRepository,UserRepository],
  controllers: [OrderController]
})
export class OrderModule {}
