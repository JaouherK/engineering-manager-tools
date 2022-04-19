import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ITask } from '../interfaces/task.interface';

@Entity({ name: 'tasks' })
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  position: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @Column({ nullable: true, type: 'timestamp' })
  due_date: null | Date;

  @ManyToOne((type) => User, (user) => user.tasks) user: User;
  @Column()
  @RelationId((task: Task) => task.user)
  userId: string;

  @Column({ default: 'initial' })
  status: string;

  @Column({ default: false })
  is_generated: boolean;

  @Column({ type: 'text'})
  links: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
