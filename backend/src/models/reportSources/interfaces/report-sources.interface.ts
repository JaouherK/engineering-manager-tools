import { Report } from '../../reports/entities/report.entity';
import { Integration } from '../../integrations/entities/integration.entity';

export interface IReportSources {
  id: string;
  foreignId: string;
  integration: Integration;
  report: Report;
  created_at: Date;
  updated_at: Date;
}
