import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';

@Injectable()
export class productServices {
  constructor(private readonly productRepository: ProductRepository) {}
  getproduct(page: number = 1, limit: number = 5) {
    return this.productRepository.getProductRepository(page, limit);
  }
  getProductbyid(id: string,relations: string[] = []) {
    
    return this.productRepository.getProductRepositoryById(id, relations);
  }
async getProductBD( ) {
    return await this.productRepository.getProductBD( );
}
  CreateProduct(product: Partial<ProductEntity>,categorId:string) {
    return this.productRepository.createProductRepository(product,categorId);
  }
  updateProduct(id: string, update: Partial<ProductEntity>): Promise<ProductEntity | null> {
    return this.productRepository.updateProductRepository(id, update);
  }
  deleteProduct(id: string): Promise<string | null> {
    return this.productRepository.deleteProductRepository(id);
  }
  sumStock(id:string,stock:number){
    return this.productRepository.SumStock(id,stock)
  }
}
