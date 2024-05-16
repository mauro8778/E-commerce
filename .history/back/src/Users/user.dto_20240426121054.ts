import { IsOptional, IsString } from 'class-validator';

export class userdto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city: string;
}
