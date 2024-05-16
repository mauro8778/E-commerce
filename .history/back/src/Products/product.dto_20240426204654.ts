import { IsBoolean, IsNumber, IsOptional, IsString, } from 'class-validator';

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
