import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  Index,
  ManyToOne,
} from 'typeorm';
import { Metadata } from './metadata.entity';

@Entity()
export class File extends BaseEntity {
  @PrimaryColumn()
  path: string;

  @ManyToOne((type) => Metadata, (metadata) => metadata.files)
  metadata: Metadata;
}
