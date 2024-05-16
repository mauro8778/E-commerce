import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.interface';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct() {
    return this.productRepository.getProductRepository();
  }
  getProductbyid(id: number) {
    return this.productRepository.getProductRepositoryById(id);
  }
  CreateProduct(product: Product) {
    return this.productRepository.createProductRepository(product);
  }
}
