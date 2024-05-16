import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import{sheeder} from '../sheeder.product';
import { ProductEntity } from 'src/Products/product.entity';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getCategory() {
    await sheeder.map(async (categorydata) =>{
      const categories = await this.categoryRepository.find({
        where:{name: categorydata.category}
      })
      const categorys= this.categoryRepository.create(categorydata)
      await this.categoryRepository.save(categorys)
    }
    )
  }

  async addCategory() {

  }
}
