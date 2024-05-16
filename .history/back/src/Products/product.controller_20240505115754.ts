import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { productServices } from './product.services';
import { ValidationGuardsGuard } from '../Auth/validation.guards.guard';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productsServices: productServices) {}


  @Get()
  getProduct(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsServices.getproduct(page, limit);
  }
  
  @Get('productDB')
  asyncgetProductBD( product: ProductEntity) {
    return this.productsServices.getProductBD( );
  }

  
  @Get(':id')
  async getProductByid(@Param('id') id: string, relations: string[] = []) {
    return this.productsServices.getProductbyid(id);
  }

  
  @Post('create')
  @UseGuards(ValidationGuardsGuard)
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() product: ProductEntity) {
    return this.productsServices.CreateProduct(product);
  }

  
  @Put('update/:id')
  @UseGuards(ValidationGuardsGuard)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() update: ProductEntity,
  ) {
    return this.productsServices.updateProduct(id, update);
  }

  
  @Delete('delete/:id')
  async deleteProduct(@Param('id',ParseUUIDPipe) id: string): Promise<string | null> {
    return this.productsServices.deleteProduct(id);
  }
}
