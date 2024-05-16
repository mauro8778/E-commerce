import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { productServices } from './product.services';
import { ProductRepository } from './product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [productServices, ProductRepository],
})
export class productModule {}
