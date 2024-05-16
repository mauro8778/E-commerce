import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/Products/product.entity';
import { sheeder } from 'src/sheeder.product';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getCategory(){
    const categories= await sheeder.map((categoryData)=>{categoryData.name})
    const category = await this.categoryRepository.save(categories)

  }
}