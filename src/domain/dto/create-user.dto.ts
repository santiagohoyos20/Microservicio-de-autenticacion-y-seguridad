import { IsEmail,  IsString } from 'class-validator';

type Role = 1 | 2 | 3;

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: Role;
}