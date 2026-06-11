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
import { IExpectation } from '../interfaces/expectation.interface';
import { Career } from '../../careers/entities/career.entity';
import { Appreciation } from '../../appreciations/entities/appreciation.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

@Entity({ name: 'position_expectations' })
export class Expectation implements IExpectation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  kpa: string;

  @Column({ type: 'text' })
  kpi: string;

  @ManyToOne((type) => Career, (career) => career.expectations, {
    onDelete: 'CASCADE',
  })
  career: Career;

  @OneToMany(
    (type) => Appreciation,
    (appreciation) => appreciation.expectation,
    {
      cascade: true,
    },
  )
  appreciations: Appreciation[];

  @OneToMany((type) => Feedback, (feedback) => feedback.expectation, {
    cascade: true,
  })
  feedbacks: Feedback[];

  @Column()
  @RelationId((expectation: Expectation) => expectation.career)
  careerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
