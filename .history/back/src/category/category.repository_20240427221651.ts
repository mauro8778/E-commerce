import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import{sheeder} from '../sheeder.category';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategory() {
    await sheeder.map(async (category) =>{
      const categories = await category.find({
        name: category.name
      })
      const categorys= this.categoryRepository.create(categories)
      await this.categoryRepository.save(categorys)
    }
    )
  }

  async addCategory() {

  }
}
