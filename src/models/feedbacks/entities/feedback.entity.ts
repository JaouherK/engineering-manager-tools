import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { IFeedback } from '../interfaces/feedback.interface';
import { Report } from '../../reports/entities/report.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'feedbacks' })
export class Feedback implements IFeedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  feedback: string;

  @ManyToOne((type) => Report, (report) => report.feedbacks) report: Report;

  @Column()
  @RelationId((feedback: Feedback) => feedback.report)
  reportId: string;

  @ManyToOne((type) => User, (user) => user.feedbacks) user: User;

  @Column()
  @RelationId((feedback: Feedback) => feedback.user)
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
