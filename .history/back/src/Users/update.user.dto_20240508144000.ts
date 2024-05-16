import { ApiHideProperty } from '@nestjs/swagger';
import {  IsEmail, IsString, MinLength, MaxLength, Matches, IsNumber, IsOptional } from 'class-validator';
import { OrderEntity } from 'src/order/order.entity';

export class UpdateUserDto {

  @ApiHideProperty()
  id:string;
@ApiHideProperty()
  orders:OrderEntity[];


 
  /** este es el nombre del usuario tiene q tener un string de 
   * entre 3 y 80 caracteres, no puede tener numeros y es opcional
@example 
*/
@IsString()
@IsOptional()
@MinLength(3)
@MaxLength(80)
@Matches(/^[^0-9]+$/, { message: 'El nombre no debe contener números' })
 name: string;

/** este es el email valido debe ser un email y es opcional
@example "carlos@gmail.com"
*/ 
@IsOptional()
@IsEmail()
 email: string;


 /** password:debe contener entre 8 y 30 caracteres, tiene q ser una string
  * con almenos una mayuscula, una minuscula, un numero y un caracter especial y es opcional
@example 
*/ 
@IsString()
@MinLength(8)
@MaxLength(30)
@IsOptional()
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/)
 password: string;
 
 /**la configuracionPassword:debe ser un string igual la password y es opcional
@example 
*/ 
@IsOptional()
 confirmacionPassword: string

  /** este es la address:debe ser un string de entre 3 y 80 caracteres y es opcional
@example 
*/ 
@IsOptional()
@IsString()
@MinLength(3)
@MaxLength(80)
 address: string;

  /** este es el  phone, debe ser solo numeros y es opcional
@example 
*/ 
@IsOptional()
@IsNumber()
 phone?: number;


  /** este es la country:debe ser un 
   * string de entre 5 y 20 caracteres y es opcional
@example 
*/ 
@IsOptional()
@IsString()
@MinLength(5)
@MaxLength(20)
 country: string;


  /** este es la city:debe ser un string de entre 5 y 20 caracteres
   * y es opcional
@example 
*/ 
@IsOptional()
@IsString()
@MinLength(5)
@MaxLength(20)
 city: string;

}
