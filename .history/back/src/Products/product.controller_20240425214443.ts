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
    return this.productsServices.getProductbyid(id);
  }

  @HttpCode(201)
  @Post('create')
  async createProduct(@Body() product: Product) {
    return this.productsServices.CreateProduct(product);
  }

  @HttpCode(200)
  @Put('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() update: Partial<Product>,
  ): Promise<Product> {
    return this.productsServices.updateProduct(id, update);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<string | null> {
    return this.productsServices.deleteProduct(id);
  }
}
