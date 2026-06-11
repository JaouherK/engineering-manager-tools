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
import { Path } from '../../paths/entities/path.entity';
import { Integration } from '../../integrations/entities/integration.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  dob: string;

  @Column({ type: 'text' })
  photo: string;

  @Column({ type: 'text' })
  wallBg: string;

  @Column({ type: 'text' })
  hash: string;

  @Column({ nullable: true, default: null })
  first_name: null | string;

  @Column({ nullable: true, default: null })
  last_name: null | string;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'text' })
  roles: string;

  @OneToMany((type) => Report, (report) => report.user) reports: Report[];

  @OneToMany((type) => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany((type) => Task, (task) => task.user) tasks: Task[];

  @OneToMany((type) => Integration, (integration) => integration.user)
  integrations: Integration[];

  @OneToMany((type) => Path, (path) => path.user) paths: Path[];

  @ManyToMany(() => Company, (company) => company.users, { cascade: true })
  @JoinTable({
    name: 'user_companies',
  })
  companies: Company[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
