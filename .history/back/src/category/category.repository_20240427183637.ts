import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import {sheeder} from '../sheeder.product';
@Injectable()
export class CategoryReposotory {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private readonly seeder = sheederproduct
  ) {}

  async getCategory() {
    return this.seeder.find((seeder) => seeder.category)
  }

  async addCategory(category: string[]) {
    const categories= category.map(name => ({name}));
    await this.categoryRepository.save(categories)
    return categories;
  }
}
