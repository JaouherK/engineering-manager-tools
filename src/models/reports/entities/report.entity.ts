import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { IReport } from '../interfaces/report.interface';
import { User } from '../../users/entities/user.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

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

  @ManyToOne((type) => User, (user) => user.reports) user: User;

  @Column()
  @RelationId((report: Report) => report.user)
  userId: string;

  @OneToMany((type) => Feedback, (feedback) => feedback.report)
  feedbacks: Feedback[];

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
