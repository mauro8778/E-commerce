import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { productServices } from './product.services';
import { Product } from './product.interface';
import { productDto } from './product.dto';

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
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() product: productDto) {
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
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<string | null> {
    return this.productsServices.deleteProduct(id);
  }
}
