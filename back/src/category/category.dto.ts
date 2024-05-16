import { IsEmpty, IsOptional, IsString } from "class-validator";
import { ProductEntity } from "src/Products/product.entity";

export class CategoryDto {
    @IsOptional()
    id: string;
  
    @IsString()
    name: string;
  
    @IsOptional()
    products: ProductEntity[];
  
  }
  