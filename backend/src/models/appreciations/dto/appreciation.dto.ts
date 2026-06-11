import { IsNotEmpty, IsUUID } from 'class-validator';

export class AppreciationDto {
  @IsNotEmpty()
  appreciation: string;

  @IsNotEmpty()
  @IsUUID()
  reportId: string;

  @IsNotEmpty()
  @IsUUID()
  expectationId: string;
}
