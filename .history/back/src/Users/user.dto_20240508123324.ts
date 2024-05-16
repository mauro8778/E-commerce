import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches, IsNumber, IsOptional, IsBoolean, IsEmpty, validate, Validate } from 'class-validator';
import { PasswordConstraint } from 'src/decorators/password.decorator';
import { OrderEntity } from 'src/order/order.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id:string;
  @ApiHideProperty()
  orders:OrderEntity[];
 

  /** este es el nombre del usuario tiene q tener un string de 
   * entre 3 y 80 caracteres y no puede tener numeros.
@example "carlos "
*/
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @Matches(/^[^0-9]+$/, { message: 'El nombre no debe contener números' })
   name: string;

  /** este es el email valido
@example "carlos@gmail.com"
*/ 
  @IsNotEmpty()
  @IsEmail()
   email: string;


   /** password:debe contener entre 8 y 30 caracteres, tiene q ser una string
    * con almenos una mayuscula, una minuscula, un numero y un caracter especial
@example "Scarlos@87"
*/ 
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/)
   password: string;



   
   /**la configuracionPassword:debe ser un string igual la password
@example "Scarlos@87"
*/ 
   @IsNotEmpty()
   @Validate(PasswordConstraint, ['password'])
   confirmacionPassword: string

    /** este es la address:debe ser un string de entre 3 y 80 caracteres
@example "calle 1234"
*/ 
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
   address: string;

    /** este es el  phone, debe ser solo numeros
@example "11236584"
*/ 
  @IsNotEmpty()
  @IsNumber()
   phone?: number;


    /** este es la country:debe ser un 
     * string de entre 5 y 20 caracteres
@example "Argentina"
*/ 
   @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
   country: string;


    /** este es la city:debe ser un string de entre 5 y 20 caracteres
@example "buenos aires"
*/ 
@IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
   city: string;
  
}
