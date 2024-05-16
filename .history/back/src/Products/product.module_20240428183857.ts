import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { productServices } from './product.services';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryEntity } from 'src/category/category.entity';
import { OrderDetailsEntity } from 'src/order/orderDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity,CategoryEntity,OrderDetailsEntity])],
  controllers: [ProductController],
  providers: [productServices, ProductRepository,CategoryRepository],
})
export class productModule {}
