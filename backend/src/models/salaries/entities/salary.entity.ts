import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { ISalary } from '../interfaces/salary.interface';
import { Report } from '../../reports/entities/report.entity';

@Entity({ name: 'salaries' })
export class Salary implements ISalary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salary: number;

  @Column()
  current: boolean;

  @ManyToOne((type) => Report, (report) => report.salaries, {
    onDelete: 'CASCADE',
  })
  report: Report;

  @Column()
  @RelationId((salary: Salary) => salary.report)
  reportId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
