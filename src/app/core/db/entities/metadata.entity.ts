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
@Index(['hash', 'sizeInBytes'], { unique: true })
export class Metadata extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  sizeInBytes: number;

  @Column({ type: 'text' })
  content: string;
}
