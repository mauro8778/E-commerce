import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { productDto } from './product.dto';
import {seederproduct} from '../sheeder.product.js'

@Injectable()
export class ProductRepository {
  private Products: productDto[] = seederproduct;
  async getProductRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.Products.slice(start, end);
  }
  async getProductRepositoryById(id: string) {
    return this.Products.find((product) => product.id == id);
  }
  async createProductRepository(product: Product) {
    const id = this.Products.length + 1;
    return this.Products.push({ ...product, id });
  }
  async updateProductRepository(
    id: string,
    update: Product
  ): Promise<any> {
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
