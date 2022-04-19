import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  feedback: string;

  @IsNotEmpty()
  @IsUUID()
  reportId: string;
}

export class EditFeedbackDto {
  @IsOptional()
  feedback: string;
}
