import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Integration } from '../../integrations/entities/integration.entity';
import { Report } from '../../reports/entities/report.entity';
import { IReportSources } from '../interfaces/report-sources.interface';

@Entity({ name: 'integration_reports' })
export class ReportSources implements IReportSources {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  foreignId: string;

  @ManyToOne((type) => Integration, (integration) => integration.reportSources)
  integration: Integration;

  @Column()
  @RelationId((reportSource: ReportSources) => reportSource.integration)
  integrationUuid: string;

  @ManyToOne((type) => Report, (report) => report.reportSources)
  report: Report;

  @Column()
  @RelationId((reportSource: ReportSources) => reportSource.report)
  reportId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
