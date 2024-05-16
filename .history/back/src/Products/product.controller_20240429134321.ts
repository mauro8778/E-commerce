import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { productServices } from './product.services';
import { productDto } from './product.dto';
import { ValidationGuardsGuard } from 'src/Auth/validation.guards.guard';
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
  @Get('userBD')
  asyncgetProductBD() {
    return this.productsServices.getProductBD();
  }

  
  @Get(':id')
  async getProductByid(@Param('id') id: string) {
    return this.productsServices.getProductbyid(id);
  }

  @HttpCode(201)
  @Post('create')
  @UseGuards(ValidationGuardsGuard)
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() product: ProductEntity) {
    return this.productsServices.CreateProduct(product);
  }

  @HttpCode(200)
  @Put('update/:id')
  @UseGuards(ValidationGuardsGuard)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id') id: string,
    @Body() update: ProductEntity,
  ) {
    return this.productsServices.updateProduct(id, update);
  }

  @HttpCode(200)
  @Delete('delete/:id')
  @UseGuards(ValidationGuardsGuard)
  async deleteProduct(@Param('id') id: string): Promise<string | null> {
    return this.productsServices.deleteProduct(id);
  }
}