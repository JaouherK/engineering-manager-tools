import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateAttributeDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  reportId: string;

  @IsOptional()
  cssClass: string;

  @IsOptional()
  color: string;

  @IsOptional()
  notes: string;
}

export class EditAttributeDto {
  @IsOptional()
  type: string;

  @IsOptional()
  content: string;

  @IsOptional()
  cssClass: string;

  @IsOptional()
  color: string;

  @IsOptional()
  notes: string;
}
