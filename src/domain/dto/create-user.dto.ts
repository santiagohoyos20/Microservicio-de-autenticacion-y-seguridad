import { IsEmail,  IsString } from 'class-validator';

type Role = 1 | 2 | 3;

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  id_rol: Role;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  phone_number: string;
}