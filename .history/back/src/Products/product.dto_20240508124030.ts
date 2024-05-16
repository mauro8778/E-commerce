import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, } from 'class-validator';
import { CategoryEntity } from '../category/category.entity';
import { OrderDetailsEntity } from 'src/order/orderDetail.entity';


export class productDto {
  @ApiHideProperty()
  @IsString()
  @IsOptional()
  id: string;

   /** este es el name:tiene q ser un string
@example "nokia 1100"
*/ 
  @IsString()
  name: string;

   /** este es la description: tiene q ser un string
@example "celular irrompible"
*/ 
  @IsString()
  description: string;

   /** este es el price: tiene q ser un number
@example "1200"
*/ 
  @IsNumber()
  price: number;

   /** este es el stock: tiene q ser un number
@example "20"
*/ 
  @IsNumber()
  stock: number;

   /** este es la foto: tiene q ser un string
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
