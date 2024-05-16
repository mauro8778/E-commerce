import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  getCategory(category: any) {
    return this.categoryRepository.getCategory(category);
  }

  addCategory(category: any) {
    return this.categoryRepository.save(category);
  }
}
