import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsBoolean()
  status = true;
}

export class EditReportDto {
  @IsOptional()
  @IsEmail()
  email: string;
}
