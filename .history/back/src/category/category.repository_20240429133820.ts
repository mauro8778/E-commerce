import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/Products/product.entity';
import * as sheeder from '../sheeder.json';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getCategory() {
    return this.categoryRepository.find();
  }
  async addCategories() {
    for (const category of sheeder) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: category.category } });
      if (!existingCategory) {
        const categoryEntity = this.categoryRepository.create({ name: category.category });
        await this.categoryRepository.save(categoryEntity);
      }
    }
  }
  
}