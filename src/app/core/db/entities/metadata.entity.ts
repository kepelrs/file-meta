import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Metadata extends BaseEntity {
  @PrimaryColumn()
  hash: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  plainText: string;

  @OneToMany((type) => File, (file) => file.metadata)
  files: File[];
}
