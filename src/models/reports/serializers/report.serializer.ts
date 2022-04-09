import { Expose } from 'class-transformer';
import { IReport } from '../interfaces/report.interface';
import { ModelEntity } from '../../../common/serializers/model.serializer';
export const defaultReportGroupsForSerializing: string[] = [
  'report.timestamps',
];
export const extendedReportGroupsForSerializing: string[] = [
  ...defaultReportGroupsForSerializing,
];
export const allReportGroupsForSerializing: string[] = [
  ...extendedReportGroupsForSerializing,
];
export class ReportEntity extends ModelEntity implements IReport {
  id: string;
  email: null | string;
  first_name: null | string;
  last_name: null | string;
  position: null | string;
  status: boolean;
  @Expose({ groups: ['report.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['report.timestamps'] })
  updatedAt: Date;
}
