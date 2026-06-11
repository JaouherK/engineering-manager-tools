import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Report } from '../../reports/entities/report.entity';

export class CreateReportSourcesDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  foreignId: string;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  integrationUuid: string;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  reportId: string;
}

export class UpdateReportSourcesDto {
  @ApiPropertyOptional()
  @IsOptional()
  foreignId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  integrationUuid?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  reportId?: string;
}
