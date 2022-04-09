import { IsEmail } from 'class-validator';

export class CreateReportDto {
  @IsEmail()
  email: string;
}
