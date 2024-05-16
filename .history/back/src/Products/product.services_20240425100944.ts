import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class productServices {
  constructor(private productRepository: ProductRepository) {}
  getproduct() {
    return this.productRepository.getProductRepository();
  }
}
