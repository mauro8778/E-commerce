import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  getCategory() {
    return this.categoryRepository.getCategory();
  }

  addCategory() {}
}
