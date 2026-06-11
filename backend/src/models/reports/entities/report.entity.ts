import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { IReport } from '../interfaces/report.interface';
import { User } from '../../users/entities/user.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';
import { Salary } from '../../salaries/entities/salary.entity';
import { Career } from '../../careers/entities/career.entity';
import { Type } from 'class-transformer';
import { Appreciation } from '../../appreciations/entities/appreciation.entity';
import { Attribute } from '../../attributes/entities/attribute';
import { ReportSources } from '../../reportSources/entities/report-sources.entity';

@Entity({ name: 'reports' })
export class Report implements IReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'first_name', nullable: true, default: null })
  firstName: null | string;

  @Column({ name: 'last_name', nullable: true, default: null })
  lastName: null | string;

  @Column({ name: 'name_preference', nullable: true, default: null })
  preferredName: null | string;

  @Column({ nullable: true, default: null })
  gender: null | string;

  @Column({ nullable: true, default: null })
  country: null | string;

  @Column({ nullable: true, default: null })
  religion: null | string;

  @Column({ nullable: true, default: null })
  mobile: null | string;

  @Column({ name: 'photo_url', nullable: true, default: null })
  photoUrl: null | string;

  @Column({ default: 'active' })
  situation: string;

  @ManyToOne((type) => User, (user) => user.reports)
  user: User;

  @Column()
  @RelationId((report: Report) => report.user)
  userId: string;

  @ManyToOne((type) => Career, (career) => career.reports)
  career: Career;

  @Column({ nullable: true, default: null })
  @RelationId((report: Report) => report.career)
  careerId: string;

  @OneToMany((type) => Feedback, (feedback) => feedback.report, {
    cascade: true,
  })
  feedbacks: Feedback[];

  @OneToMany((type) => Attribute, (attribute) => attribute.report, {
    cascade: true,
  })
  attributes: Attribute[];

  @OneToMany((type) => Appreciation, (appreciation) => appreciation.report, {
    cascade: true,
  })
  appreciations: Appreciation[];

  @OneToMany((type) => Salary, (salary) => salary.report, {
    cascade: true,
  })
  salaries: Salary[];

  @OneToMany((type) => ReportSources, (reportSources) => reportSources.report)
  reportSources: ReportSources[];


  @Column({ default: true })
  status: boolean;

  @Type(() => Date)
  @Column({ nullable: true, default: null })
  birthday: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
