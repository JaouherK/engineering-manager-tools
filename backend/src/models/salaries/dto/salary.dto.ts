import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateSalaryDto {
  @IsNotEmpty()
  salary: number;

  @IsOptional()
  current: boolean;

  @IsNotEmpty()
  @IsUUID()
  reportId: string;
}

export class EditSalaryDto {
  @IsOptional()
  salary: number;

  @IsOptional()
  current: boolean;
}
