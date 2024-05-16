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

  async getCategory(productId:string) {
    const product = await this.productRepository.findOne({
      where:{id: productId},
      relations: ['category_id'],
    })

    if (!product) {
      throw new Error('Product not found');
    }
    const categorias = product.category_id.map((category) => category.name);
    return categorias;
  
  }

  async addCategory() {

  }
}
