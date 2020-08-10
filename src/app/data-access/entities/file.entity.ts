import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Metadata } from './metadata.entity';

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  sizeInBytes: number;

  @Column({ nullable: true })
  md5: string;

  @ManyToOne((type) => Metadata, (metadata) => metadata.files)
  metadata: Metadata;
}
