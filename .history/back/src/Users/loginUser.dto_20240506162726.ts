import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  /** este es el email
@example "carlos@gmail.com"
*/ 
  @IsEmail()
  @IsNotEmpty()
   email: string;


   /** este es el password
@example "Scarlos@87"
*/ 
  @IsString()
  @IsNotEmpty()
   password: string;
}