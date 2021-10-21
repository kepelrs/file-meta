import { Dree } from 'dree';
import { Metadata } from './db/entities/metadata.entity';

export interface DreeWithMetadata extends Dree {
  metadata?: Metadata;
}

export type AppLanguage = 'en' | 'pt';
