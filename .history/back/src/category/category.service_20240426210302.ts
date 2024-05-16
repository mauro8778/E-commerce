import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  getCategories(category: any) {
    return this.categoryRepository.find(category);
  }

  addCategories(category: any) {
    return this.categoryRepository.save(category);
  }
}
