import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { ProductEntity } from 'src/Products/product.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, ProductEntity])],
  providers: [ CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}

