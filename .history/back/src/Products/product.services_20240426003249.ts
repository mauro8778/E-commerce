import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { productDto } from './product.dto';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct(page: number = 1, limit: number = 5) {
    return this.productRepository.getProductRepository(page, limit);
  }
  getProductbyid(id: string) {
    return this.productRepository.getProductRepositoryById(id);
  }
  CreateProduct(product: productDto) {
    return this.productRepository.createProductRepository(product);
  }
  updateProduct(id: string, update: productDto): Promise<productDto | null> {
    return this.productRepository.updateProductRepository(id, update);
  }
  deleteProduct(id: string): Promise<string | null> {
    return this.productRepository.deleteProductRepository(id);
  }
}
