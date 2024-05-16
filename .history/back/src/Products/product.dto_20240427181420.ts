import { IsBoolean, IsNumber, IsOptional, IsString, } from 'class-validator';
import { CategoryEntity } from 'src/category/category.entity';

export class productDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  imgUrl: string;

}
