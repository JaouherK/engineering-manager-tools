import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IReport } from '../interfaces/report.interface';

@Entity({ name: 'reports' })
export class Report implements IReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, default: null })
  first_name: null | string;

  @Column({ nullable: true, default: null })
  last_name: null | string;

  // @ManyToOne(type => User, student => student.projects) student: Student;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
