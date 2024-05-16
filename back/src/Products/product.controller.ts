import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../Users/user.enum';
import { RolesGuard } from '../guards/role.guard';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './product.dto';


@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productsServices: productServices) {}


  @Get()
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: "100" })
  @ApiQuery({ name: 'page', required: false, type: Number, description: "1" })
  async getProduct(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const product = await this.productsServices.getproduct(page, limit);
    
    if(!product){
      throw new NotFoundException('no se encontraron productos')
    }
    return product
  }
 
  @Get('productDB')
  async getProductBD() {
    return this.productsServices.getProductBD( );
  }

  
  @Get(':id')
  async getProductByid(@Param('id',ParseUUIDPipe) id: string, relations: string[] = []) {
    return this.productsServices.getProductbyid(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @UseGuards(ValidationGuardsGuard)
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() product: ProductDto) {
    const{ categoryId , ...producto} = product
    return this.productsServices.CreateProduct(producto,categoryId);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  @Roles(Role.admin)
  @UseGuards(ValidationGuardsGuard,RolesGuard)
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() update: ProductDto,
  ) {
    return this.productsServices.updateProduct(id, update);
  }

  @Put('stock/:id')
  async SumStock(@Param('id')id:string, 
  @Body() body: { stock: number }){
    const {stock} = body
    return await this.productsServices.sumStock(id,stock)

  }

  
  @Delete('delete/:id')
  async deleteProduct(@Param('id',ParseUUIDPipe) id: string): Promise<string | null> {
    return this.productsServices.deleteProduct(id);
  }


}
