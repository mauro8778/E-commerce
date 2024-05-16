import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';
import { UserEntity } from 'src/Users/user.entity';
import { ProductEntity } from 'src/Products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ OrderEntity,OrderDetailsEntity,UserEntity,ProductEntity])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
