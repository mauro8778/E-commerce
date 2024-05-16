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

@Controller('product')
@UseGuards(ValidationGuardsGuard())
export class ProductController {
  constructor(private readonly productsServices: productServices) {}

  @HttpCode(200)
  @Get()
  getProduct(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsServices.getproduct(page, limit);
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
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id') id: string,
    @Body() update: productDto,
  ): Promise<productDto> {
    return this.productsServices.updateProduct(id, update);
  }

  @HttpCode(200)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<string | null> {
    return this.productsServices.deleteProduct(id);
  }
}
