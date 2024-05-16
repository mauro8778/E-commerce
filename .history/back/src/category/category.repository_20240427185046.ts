import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import {sheeder} from '../sheeder.product';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly seeder = sheeder
  ) {}

  async getCategory() {
    return this.seeder.find((seeder) => seeder.category)
  }

  async addCategory() {

  }
}
