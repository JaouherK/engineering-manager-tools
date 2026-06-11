import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ICompany } from '../interfaces/company.interface';
import { User } from '../../users/entities/user.entity';
import { Career } from '../../careers/entities/career.entity';
import { Path } from "../../paths/entities/path.entity";

@Entity({ name: 'companies' })
export class Company implements ICompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, default: null })
  logo_url: string;

  @Column({ default: true })
  status: boolean;

  @ManyToMany(() => User, (user) => user.companies)
  @JoinTable({
    name: 'user_companies',
  })
  users: User[];

  @OneToMany((type) => Path, (path) => path.company) paths: Path[];

  // @OneToMany((type) => Career, (career) => career.companyId, {
  //   cascade: true,
  // })
  // ladders: Career[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
