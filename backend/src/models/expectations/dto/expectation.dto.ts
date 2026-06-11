import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateExpectationDto {
  @IsOptional()
  kpa: string;

  @IsNotEmpty()
  kpi: string;

  @IsNotEmpty()
  @IsUUID()
  careerId: string;
}

export class EditExpectationDto {
  @IsOptional()
  kpa: string;

  @IsOptional()
  kpi: string;

  @IsOptional()
  @IsUUID()
  careerId: string;
}
