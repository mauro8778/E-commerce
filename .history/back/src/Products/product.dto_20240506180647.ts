import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, } from 'class-validator';
import { CategoryEntity } from '../category/category.entity';
import { OrderDetailsEntity } from 'src/order/orderDetail.entity';


export class productDto {
  @ApiHideProperty()
  @IsString()
  @IsOptional()
  id: string;

   /** este es el name
@example "nokia 1100"
*/ 
  @IsString()
  name: string;

   /** este es la description
@example "celular irrompible"
*/ 
  @IsString()
  description: string;

   /** este es el price
@example "1200"
*/ 
  @IsNumber()
  price: number;

   /** este es el stock
@example "20"
*/ 
  @IsNumber()
  stock: number;

   /** este es la foto
@example "null"
*/ 
  @IsString()
  imgUrl: string;

@ApiHideProperty()
  @IsString()
  @IsOptional()
  category_id: CategoryEntity;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  order: OrderDetailsEntity[];

}
