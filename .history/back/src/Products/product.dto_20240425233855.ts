import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class productDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  stock: boolean;

  @IsString()
  imgUrl: string;
}
