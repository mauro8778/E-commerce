import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../Products/product.entity';
import * as seeder from '../seeder.json';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getCategory() {
    return this.categoryRepository.find({relations:['products']});
  }
  async addCategories() {
    for (const category of seeder) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: category.category } });
      if (!existingCategory) {
        const categoryEntity = this.categoryRepository.create({ name: category.category });
        await this.categoryRepository.save(categoryEntity);
      }
    }
  }
  
}