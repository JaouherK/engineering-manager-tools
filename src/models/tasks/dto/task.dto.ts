import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  position = 0;

  @IsOptional()
  notes: string;

  @IsOptional()
  due_date: Date = null;

  @IsOptional()
  is_generated = false;

  @IsOptional()
  links: string;

  @IsOptional()
  status = 'initial';
}

export class EditTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  position = 0;

  @IsOptional()
  notes: string;

  @IsOptional()
  due_date: Date = null;

  @IsOptional()
  is_generated = false;

  @IsOptional()
  links = '{}';

  @IsOptional()
  status = 'initial';
}
