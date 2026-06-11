import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ReportSources } from '../../reportSources/entities/report-sources.entity';

@Entity()
export class Integration implements IIntegration {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  provider_name: string;

  @Column()
  auth_token: string;

  @Column()
  endpoint: string;

  @Column({ nullable: true })
  method?: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.integrations)
  user: User;

  @OneToMany(
    (type) => ReportSources,
    (integrationReport) => integrationReport.integration,
    { cascade: true },
  )
  reportSources: ReportSources[];

  @Column()
  @RelationId((integration: Integration) => integration.user)
  userId: string;
}
