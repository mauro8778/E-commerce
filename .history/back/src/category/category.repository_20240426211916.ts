import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryReposotory {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategory() {
    return this.categoryRepository.find();
  }

  async addCategory(category: any) {
    return this.categoryRepository.save(category);
  }
}
