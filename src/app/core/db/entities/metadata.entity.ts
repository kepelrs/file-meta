import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Metadata extends BaseEntity {
  @PrimaryColumn()
  md5: string;

  @Column({ type: 'text' })
  content: string;

  @OneToMany((type) => File, (file) => file.metadata)
  files: File[];
}
