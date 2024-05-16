import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { productServices } from './product.services';

@Controller('product')
export class ProductController {
  constructor(private readonly productsServices: productServices) {}

  @Get()
  getProduct() {
    return this.productsServices.getproduct();
  }
  @Get()
  async getProductByid() {}
  @Post()
  async createProduct() {}
  @Put(':id')
  async updateProduct() {}
  @Delete(':id')
  async deleteProduct() {}
}
