import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { productDto } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct(page: number = 1, limit: number = 5) {
    return this.productRepository.getProductRepository(page, limit);
  }
  getProductbyid(id: string) {
    return this.productRepository.getProductRepositoryById(id);
  }
  getProductBd
  CreateProduct(product: ProductEntity) {
    return this.productRepository.createProductRepository(product);
  }
  updateProduct(id: string, update: ProductEntity): Promise<ProductEntity | null> {
    return this.productRepository.updateProductRepository(id, update);
  }
  deleteProduct(id: string): Promise<string | null> {
    return this.productRepository.deleteProductRepository(id);
  }
}
