import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Report } from '../../reports/entities/report.entity';
import { IAttribute } from '../interfaces/attribute.interface';

@Entity({ name: 'attributes' })
export class Attribute implements IAttribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  cssClass: string;

  @Column({ type: 'text' })
  color: string;

  @Column({ type: 'text' })
  notes: string;

  @ManyToOne((type) => Report, (report) => report.attributes, {
    onDelete: 'CASCADE',
  })
  report: Report;

  @Column()
  @RelationId((attribute: Attribute) => attribute.report)
  reportId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
