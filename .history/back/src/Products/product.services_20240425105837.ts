import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct():any{
    return this.productRepository.getProductRepository();
  }
}
