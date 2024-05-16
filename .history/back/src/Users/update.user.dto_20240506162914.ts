import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches, IsNumber, IsOptional } from 'class-validator';
import { OrderEntity } from 'src/order/order.entity';

export class UpdateUserDto {

  @ApiHideProperty()
  id:string;
@ApiHideProperty()
  orders:OrderEntity[];


  @IsOptional()
   name: string;

   @IsOptional()
   email: string;

   @IsOptional()
    password: string;

    @IsOptional()
    confirmacionPassword: string;

    @IsOptional()
     address: string;

  
     @IsOptional()
   phone?: number;

   @IsOptional()
   country: string;

   @IsOptional()
      city: string;

      @IsOptional()
      IsAdmin:false
}
