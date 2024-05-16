import { Injectable } from '@nestjs/common';
import { productDto } from './product.dto';
import { sheeder } from '../sheeder.product';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
  @Injectable(ProductEntity)
 private readonly productrepository: Repository<ProductEntity>,
){}
  async getProductRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.productrepository.find({ skip: start, take: end });

  }
  async getProductBD(){
    
    await Promise.all(sheeder.map((product)=>this.productrepository.save(product)))

  }
  async getProductRepositoryById(id: string) {
    return this.productrepository.find((product) => product.id == id);
  }
  async createProductRepository(productrepository: Partial<ProductEntity>) {
    return this.productrepository.save(productrepository);
  }
  async updateProductRepository(id: string, update: productDto): Promise<any> {
    const updateProduct = await this.productrepository.find(id)

    if (updateProduct !== -1) {
      this.productrepository[updateProduct] = {

    }
  async deleteProductRepository(id: string) {
    const deleteProduct: any = await this.Products.findIndex(
      (product) => product.id == id,
    );
    if (deleteProduct !== 1) {
      const Delete = await this.Products.splice(deleteProduct, 1)[0];

      return Delete.id;
    }
    return null;
  }
}
