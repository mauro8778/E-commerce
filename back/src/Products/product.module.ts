import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { productServices } from './product.services';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/category.entity';
import { OrderDetailsEntity } from '../order/orderDetail.entity';
import { OrderEntity } from '../order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity,CategoryEntity,OrderEntity,OrderDetailsEntity])],
  controllers: [ProductController],
  providers: [productServices, ProductRepository,CategoryRepository],
  exports: [ProductRepository],
})
export class productModule {}
