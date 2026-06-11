import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId, OneToMany
} from "typeorm";
import { IPath } from '../interfaces/path.interface';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { Feedback } from "../../feedbacks/entities/feedback.entity";
import { Career } from "../../careers/entities/career.entity";

@Entity({ name: 'career_paths' })
export class Path implements IPath {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true })
  private: boolean;

  @Column()
  type: string;

  @ManyToOne((type) => User, (user) => user.paths)
  user: User;

  @Column()
  @RelationId((path: Path) => path.user)
  userId: string;

  @ManyToOne((type) => Company, (company) => company.paths, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @OneToMany((type) => Career, (career) => career.path, {
    cascade: true,
  })
  careers: Career[];

  @Column()
  @RelationId((path: Path) => path.company)
  companyId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
