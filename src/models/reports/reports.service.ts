import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportsRepository } from './reports.repository';
import { ReportEntity } from './serializers/report.serializer';
import { CreateReportDto, EditReportDto } from './dto/repot.dto';
@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(ReportsRepository)
    private readonly reportsRepository: ReportsRepository,
  ) {}

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ReportEntity | null> {
    return await this.reportsRepository.get(id, relations, throwsException);
  }

  async create(inputs: CreateReportDto): Promise<ReportEntity> {
    return await this.reportsRepository.createEntity(inputs);
  }

  // async update(
  //   report: ReportEntity,
  //   inputs: EditReportDto,
  // ): Promise<ReportEntity> {
  //   return await this.reportsRepository.updateEntity(inputs);
  // }
}
