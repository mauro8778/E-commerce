import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { productServices } from './product.services';

@Controller('product')
export class ProductController {
  constructor(private readonly productsServices: productServices) {}

  @Get()
  getProduct() {
    return this.productsServices.getproduct();
  }
  @Get(':id')
  async getProductByid() {}
  @Post('create')
  async createProduct() {}
  @Put('update')
  async updateProduct(id) {}
  @Delete('delete')
  async deleteProduct(id) {}
}
