import { IsNotEmpty, IsUUID, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class PartialDto{
  @ApiHideProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
  
}
export class CreateOrderDto {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

@ApiHideProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PartialDto)
  products: PartialDto[];
}


