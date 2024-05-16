import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.interface';
import { productDto } from './product.dto';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct() {
    return this.productRepository.getProductRepository();
  }
  getProductbyid(id: string) {
    return this.productRepository.getProductRepositoryById(id);
  }
  CreateProduct(product: productDto) {
    return this.productRepository.createProductRepository(product);
  }
  updateProduct(id: string, update: productDto): Promise<Product | null> {
    return this.productRepository.updateProductRepository(id, update);
  }
  deleteProduct(id: string): Promise<string | null> {
    return this.productRepository.deleteProductRepository(id);
  }
}
