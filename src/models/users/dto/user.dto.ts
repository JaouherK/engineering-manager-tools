import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsBoolean()
  status = true;
}

export class EditUserDto {
  @IsOptional()
  @IsEmail()
  email: string;
}
