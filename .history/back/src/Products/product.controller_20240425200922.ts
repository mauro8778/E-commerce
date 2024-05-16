import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { productServices } from './product.services';
import { Product } from './product.interface';

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
  async getProductByid(@Param('id') id: string) {
    return this.productsServices.getProductbyid(Number(id));
  }

  @HttpCode(201)
  @Post('create')
  async createProduct(@Body() product: Product) {
    return this.productsServices.CreateProduct(product);
  }

  @HttpCode(200)
  @Put('update')
  async updateProduct(id: string) {
    return this.productsServices.updateProduct(Number(id));
  }

  @HttpCode(200)
  @Delete('delete')
  async deleteProduct(id:string) {
    return this.productsServices.deleteProduct(Number(id));
  }
}
