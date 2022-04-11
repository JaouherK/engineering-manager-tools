import { EntityRepository } from 'typeorm';
import { Report } from './entities/report.entity';
import { ModelRepository } from '../model.repository';
import {
  allReportGroupsForSerializing,
  ReportEntity,
} from './serializers/report.serializer';
import { instanceToPlain, plainToClass } from 'class-transformer';
@EntityRepository(Report)
export class ReportsRepository extends ModelRepository<Report, ReportEntity> {
  transform(model: Report): ReportEntity {
    const transformOptions = {
      groups: allReportGroupsForSerializing,
    };
    return plainToClass(
      ReportEntity,
      instanceToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Report[]): ReportEntity[] {
    return models.map((model) => this.transform(model));
  }
}
