import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCareerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  pathId: string;

  @IsOptional()
  @IsUUID()
  parentCategoryId: string;

  @IsOptional()
  description: string;

  @IsOptional()
  color: string;

  @IsOptional()
  appreciations: string;

  @IsOptional()
  promotion_eligibility: string;
}

export class EditCareerDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  color: string;

  @IsOptional()
  appreciations: string;

  @IsOptional()
  promotion_eligibility: string;
}
