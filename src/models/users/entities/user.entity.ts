import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Report } from '../../reports/entities/report.entity';
import { Company } from '../../companies/entities/company.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  password: string;

  @Column({ nullable: true, default: null })
  first_name: null | string;

  @Column({ nullable: true, default: null })
  last_name: null | string;

  @Column({ default: true })
  status: boolean;

  @OneToMany((type) => Report, (report) => report.user) reports: Report[];

  @OneToMany((type) => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany((type) => Task, (task) => task.user) tasks: Task[];

  @ManyToMany(() => Company, (company) => company.users)
  @JoinTable({
    name: 'user_companies',
  })
  companies: Company[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
