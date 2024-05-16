import { IsString } from 'class-validator';

export class productDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  price: number;

  @IsString()
  stock: number;

  @IsString()
  image: string;
}
