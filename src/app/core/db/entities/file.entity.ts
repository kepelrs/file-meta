import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  Index,
  ManyToOne,
  AfterLoad,
  BeforeInsert,
} from 'typeorm';
import { Metadata } from './metadata.entity';
import { Dree } from 'dree';
import { DreeWithMetadata } from '../../types';

@Entity()
export class File extends BaseEntity {
  @PrimaryColumn()
  path: string;

  @Column('text')
  dreeData: string;

  // not a column
  parsedDreeData: DreeWithMetadata;

  @ManyToOne((type) => Metadata, (metadata) => metadata.files)
  metadata: Metadata;

  @AfterLoad()
  afterLoad() {
    this.parsedDreeData = JSON.parse(this.dreeData);
  }

  @BeforeInsert()
  beforeInsert() {
    this.dreeData = JSON.stringify(this.parsedDreeData);
  }

  constructor(partial: Partial<File>) {
    super();
    Object.assign(this, partial);
  }
}
