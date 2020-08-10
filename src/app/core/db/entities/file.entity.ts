import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';
import { Metadata } from './metadata.entity';

@Entity()
@Unique('pathsizemd5', ['path', 'sizeInBytes', 'metadataMd5'])
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
  metadataMd5?: string; // this is fk -> Metadata
  @ManyToOne((type) => Metadata, (metadata) => metadata.files)
  metadata: Metadata;
}
