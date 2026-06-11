import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  status = true;

  @IsOptional()
  preferredName: string;

  @IsOptional()
  photoUrl: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  country: string;

  @IsOptional()
  religion: string;

  @IsOptional()
  mobile: string;

  @IsOptional()
  careerId: string;

  @IsOptional()
  situation: string;
}

export class EditReportDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsBoolean()
  status = true;

  @IsOptional()
  preferredName: string;

  @IsOptional()
  photoUrl: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  country: string;

  @IsOptional()
  religion: string;

  @IsOptional()
  mobile: string;

  @IsOptional()
  careerId: string;

  @IsOptional()
  situation: string;
}
