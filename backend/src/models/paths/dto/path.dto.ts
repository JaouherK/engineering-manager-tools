import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePathDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  private: boolean;

  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @IsOptional()
  type: string;
}

export class EditPathDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  private: boolean;
}
