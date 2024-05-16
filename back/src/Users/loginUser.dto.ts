import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginUserDto {
  /** password:debe contener entre 8 y 30 caracteres, tiene q ser una string
   * con almenos una mayuscula, una minuscula, un numero y un caracter especial
*/
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/)
  password: string;



  /** este es el email valido
@example 

*/
  @IsNotEmpty()
  @IsEmail()
  email: string;
}