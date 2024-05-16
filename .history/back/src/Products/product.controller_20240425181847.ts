import { Controller, Delete, Get, HttpCode, Post, Put } from '@nestjs/common';
import { productServices } from './product.services';

@Controller('product')
export class ProductController {
  constructor(private readonly productsServices: productServices) {}

  @HttpCode(200)
  @Get()
  getProduct() {
    return this.productsServices.getproduct();
  }

  @HttpCode(200)
  @Get(':id')
  async getProductByid() {}

  @HttpCode(201)
  @Post('create')
  async createProduct() {}

  @HttpCode(200)
  @Put('update')
  async updateProduct(id) {}
  
  @HttpCode(200)
  @Delete('delete')
  async deleteProduct(id) {}
}
