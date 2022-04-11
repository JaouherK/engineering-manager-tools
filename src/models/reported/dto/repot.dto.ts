import { IsEmail } from 'class-validator';

export class CreateReportDto {
  @IsEmail()
  email: string;
}

export class EditReportDto {
  @IsEmail()
  email: string;
}
