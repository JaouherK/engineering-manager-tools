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
import { ICareer } from '../interfaces/creer.interface';
import { Path } from '../../paths/entities/path.entity';
import { Expectation } from '../../expectations/entities/expectation.entity';
import { Report } from "../../reports/entities/report.entity";

@Entity({ name: 'careers' })
export class Career implements ICareer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  color: string;

  @Column({ type: 'text' })
  appreciations: string;

  @Column()
  promotion_eligibility: string;

  @ManyToOne((type) => Path, (path) => path.careers)
  path: Path;

  @Column()
  @RelationId((career: Career) => career.path)
  pathId: string;

  @ManyToOne((type) => Career, (career) => career.childCategories)
  parentCategory: Career;

  @Column({ nullable: true, default: null })
  @RelationId((career: Career) => career.parentCategory)
  parentCategoryId: string;

  @OneToMany((type) => Expectation, (expectation) => expectation.career)
  expectations: Expectation[];

  @OneToMany((type) => Career, (career) => career.parentCategory)
  childCategories: Career[];

  @OneToMany((type) => Report, (report) => report.career) reports: Report[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
