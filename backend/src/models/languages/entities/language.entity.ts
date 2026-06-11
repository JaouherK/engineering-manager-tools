/**
 * Entity Schema for Languages.
 *
 * @class
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ILanguage } from '../interfaces/language.interface';

@Entity({
  name: 'languages',
})
export class Language implements ILanguage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
