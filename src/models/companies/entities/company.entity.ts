import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ICompany } from '../interfaces/company.interface';
import { User } from '../../users/entities/user.entity';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
