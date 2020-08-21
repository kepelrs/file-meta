import { Injectable } from '@angular/core';
import { FileSystemQuery } from './file-system.query';
import * as dree from 'dree';
import { FileSystemStore } from './file-system.store';
import { DatabaseService } from '../db/database.service';
import { HashService } from '../services/hash.service';
import { DreeWithMetadata } from '../types';
import { Repository } from 'typeorm';
import { Metadata } from '../db/entities/metadata.entity';
import { Dree } from 'dree';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private metadataRepo: Promise<Repository<Metadata>>;
  constructor(
    private fileSystemStore: FileSystemStore,
    private hashService: HashService,
    private dbService: DatabaseService
  ) {
    this.metadataRepo = this.dbService.connection.then((c) =>
      c.getRepository(Metadata)
    );

    this.navigate();
  }

  private async getDreeWithHashAndMeta(
    folder: string
  ): Promise<DreeWithMetadata> {
    const metadataRepo = await this.metadataRepo;

    const dreeScan = dree.scan(folder, { hash: false, depth: 1 });
    const children: DreeWithMetadata[] = dreeScan.children || [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === 'file') {
        child.hash = await this.hashService.hashFile(child.path);
        child.metadata = await this.loadMetadata(child, metadataRepo);
      }
    }

    return dreeScan;
  }

  private async loadMetadata(
    node: Dree,
    metadataRepo: Repository<Metadata>
  ): Promise<Metadata> {
    return metadataRepo.findOne({
      hash: node.hash,
      sizeInBytes: node.sizeInBytes,
    });
  }

  public async addMetadata(node: DreeWithMetadata, metadataContent: string) {
    const metadataRepo = await this.metadataRepo;
    await metadataRepo.save({
      hash: node.hash,
      content: metadataContent,
      sizeInBytes: node.sizeInBytes,
    });

    await this.navigate();
  }

  public async navigate(
    folder: string = this.fileSystemStore.getValue().folderPath
  ) {
    const dreeScan = await this.getDreeWithHashAndMeta(folder);

    this.fileSystemStore.update((state) => ({
      folderPath: folder,
      dree: dreeScan,
    }));
  }
}
