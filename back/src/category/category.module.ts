import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { ProductEntity } from '../Products/product.entity';
import { OrderEntity } from '../order/order.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, OrderEntity,ProductEntity])],
  providers: [CategoryRepository, CategoryService],
  controllers: [CategoryController],
  exports:[CategoryRepository]
})
export class CategoryModule {}

