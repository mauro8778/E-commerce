import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../Products/product.entity';
import * as seeder from '../seeder.json';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getCategory() {

    const category= await this.categoryRepository.find({relations:['products']});
    
    if(category.length === 0){
      throw new NotFoundException('no hay categorias disponible')
    }
    return category
  }
  async addCategories() {
    for (const category of seeder) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: category.category } });
      if (!existingCategory) {
        const categoryEntity = this.categoryRepository.create({ name: category.category });
        await this.categoryRepository.save(categoryEntity);
      }
    }
    return 'categorias cargadas con exito'
  }
  async newcategory(){
    


  }
  
}