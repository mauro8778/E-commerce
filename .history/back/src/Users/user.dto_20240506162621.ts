import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches, IsNumber, IsOptional, IsBoolean, IsEmpty, validate, Validate } from 'class-validator';
import { PasswordConstraint } from 'src/decorators/password.decorator';
import { OrderEntity } from 'src/order/order.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id:string;
  @ApiHideProperty()
  orders:OrderEntity[];
 

  /** este es el nombre
@example "carlos "
*/
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
   name: string;

  /** este es el email
@example "carlos@gmail.com"
*/ 
  @IsNotEmpty()
  @IsEmail()
   email: string;


   /** este es el password
@example "Scarlos@87"
*/ 
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/)
   password: string;


   
   /** este es la confirmacionPassword
@example "Scarlos@87"
*/ 
   @IsNotEmpty()
   @Validate(PasswordConstraint, ['password'])
   confirmacionPassword: string

    /** este es la address
@example "calle 1234"
*/ 
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
   address: string;

    /** este es el  phone
@example "11236584"
*/ 
  @IsNotEmpty()
  @IsNumber()
   phone?: number;


    /** este es la country
@example "Argentina"
*/ 
   @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
   country: string;


    /** este es la city
@example "buenos aires"
*/ 
@IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
   city: string;
  
}
