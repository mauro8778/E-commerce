import { IsString } from 'class-validator';

export class userdto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  country: string;

  @IsString()
  city: string;
}
