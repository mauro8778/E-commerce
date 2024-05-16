import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches, IsNumber, IsOptional, IsBoolean, IsEmpty } from 'class-validator';
import { OrderEntity } from 'src/order/order.entity';

export class CreateUserDto {

  id:string;

  orders:OrderEntity[];


  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
   name: string;

  @IsNotEmpty()
  @IsEmail()
   email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/)
   password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
   address: string;

  @IsNotEmpty()
  @IsNumber()
   phone?: number;

   @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
   country: string;

@IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
   city: string;
  
   @IsNotEmpty()
   @IsBoolean()
   IsAdmin:false;
}
