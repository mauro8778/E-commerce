import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/Products/product.entity';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getCategory(productId:string) {
    const product = await this.productRepository.findOne({
      where:{id: productId},
      relations: ['category'],
    })



    if (!product) {
      throw new Error('Product not found');
    }

    const categoryName = product.category.name;
    let existingCategory = await this.categoryRepository.findOne({ where: { name: categoryName } });

    if (!existingCategory) {
     
      const newCategory = new CategoryEntity();
      newCategory.name = categoryName;

     
      existingCategory = await this.categoryRepository.save(newCategory);
    }

    return categoryName;
  }
}