import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity()
export class Metadata extends BaseEntity {
  @PrimaryColumn()
  hash: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  plainText: string;
}
