import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { productServices } from './product.services';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [productServices, ProductRepository,CategoryRepository],
})
export class productModule {}
