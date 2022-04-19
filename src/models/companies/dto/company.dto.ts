import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  status = true;

  @IsOptional()
  logo_url: string;
}

export class EditCompanyDto {
  @IsNotEmpty()
  name: string;
}
