import { Injectable } from '@nestjs/common';
import { productDto } from './product.dto';
import { sheeder } from '../sheeder.product';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(

  @Injectable(ProductEntity)
 private readonly productrepository: Repository<ProductEntity>){}
  async getProductRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.productrepository.find({ skip: start, take: end });

  }
  async getProductBD(){
    
    await Promise.all(sheeder.map((product)=>this.ProductRepository

  }
  async getProductRepositoryById(id: string) {
    return this.Products.find((product) => product.id == id);
  }
  async createProductRepository(product: productDto) {
    const id = this.Products.length + 1;
    return this.Products.push({ ...product, id: id.toString(id) });
  }
  async updateProductRepository(id: string, update: productDto): Promise<any> {
    const updateProduct = await this.Products.findIndex(
      (product) => product.id == id,
    );
    if (updateProduct !== -1) {
      this.Products[updateProduct] = { ...update, id };
      return id;
    }
    return null;
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
