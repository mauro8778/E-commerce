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

  async getCategory() {
    await Promise.all( sheeder.map(async(categoryData)=>{

      const categori= await this.categoryRepository.findOne({ where: { name: categoryData.category } })
      if(!categori)
        
        {
        const category = await this.categoryRepository.create({name:categoryData.category})
    return await this.categoryRepository.save(category)
      }
    


  }))
}}