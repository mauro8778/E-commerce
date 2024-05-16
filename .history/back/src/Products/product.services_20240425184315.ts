import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct() {
    return this.productRepository.getProductRepository();
  }
  getProductbyid(id: number) {
    return this.productRepository.getProductRepositoryById(id);
  }
}
