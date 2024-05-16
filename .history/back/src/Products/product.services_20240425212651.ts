import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.interface';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct() {
    return this.productRepository.getProductRepository();
  }
  getProductbyid(id: string) {
    return this.productRepository.getProductRepositoryById(id);
  }
  CreateProduct(product: Product) {
    return this.productRepository.createProductRepository(product);
  }
  updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
    return this.productRepository.updateProductRepository(id, update);
  }
  deleteProduct(id: string) {
    return this.productRepository.deleteProductRepository(id);
  }
}
