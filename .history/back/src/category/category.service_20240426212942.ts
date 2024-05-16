import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryReposotory } from './category.repository';
@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryReposotory,
  ) {}
  getCategory() {
    return this.categoryRepository.getCategory();
  }

  addCategory(category: string[]) {
    return this.categoryRepository.addCategory(category);
  }
}
