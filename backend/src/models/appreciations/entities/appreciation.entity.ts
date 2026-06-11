import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { IAppreciation } from '../interfaces/appreciation.interface';
import { Report } from '../../reports/entities/report.entity';
import { Expectation } from '../../expectations/entities/expectation.entity';

@Entity({ name: 'appreciations' })
export class Appreciation implements IAppreciation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  appreciation: string;

  @ManyToOne((type) => Report, (report) => report.appreciations, {
    onDelete: 'CASCADE',
  })
  report: Report;

  @Column()
  @RelationId((appreciation: Appreciation) => appreciation.report)
  reportId: string;

  @ManyToOne((type) => Expectation, (expectation) => expectation.appreciations)
  expectation: Expectation;

  @Column()
  @RelationId((appreciation: Appreciation) => appreciation.expectation)
  expectationId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
