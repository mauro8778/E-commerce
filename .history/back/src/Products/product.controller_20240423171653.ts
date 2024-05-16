import { Controller, Get } from '@nestjs/common';
import { productServices } from './product.services';

@Controller('product')
export class ProductController {
  constructor(private readonly productsServices: productServices) {}

  @Get()
  getProduct(): string {
    return this.productsServices.getproduct();
  }
}
