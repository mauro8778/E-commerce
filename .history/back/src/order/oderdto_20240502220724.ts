import { IsNotEmpty, IsUUID, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class PartialDto{
  @IsNotEmpty()
  @IsUUID()
  id: string;
  
}
export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PartialDto)
  products: PartialDto[];
}


