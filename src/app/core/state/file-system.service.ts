import { Injectable } from '@angular/core';
import { FileSystemQuery } from './file-system.query';
import * as dree from 'dree';
import { FileSystemStore } from './file-system.store';
import { DatabaseService } from '../db/database.service';
import { HashService } from '../services/hash.service';
import { DreeWithMetadata } from '../types';
import { Repository } from 'typeorm';
import { Metadata } from '../db/entities/metadata.entity';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  constructor(
    private fileSystemStore: FileSystemStore,
    private hashService: HashService,
    private dbService: DatabaseService
  ) {
    this.navigate();
  }

  private async getDreeWithHash(folder: string) {
    const dreeScan = dree.scan(folder, { hash: false, depth: 1 });
    const children = dreeScan.children || [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === 'file') {
        child.hash = await this.hashService.hashFile(child.path);
      }
    }

    return dreeScan;
  }

  public async addMetadata(node: DreeWithMetadata, metadataContent: string) {
    const metadataRepo = (await this.dbService.connection).getRepository(
      Metadata
    );
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
    const dreeScan = await this.getDreeWithHash(folder);

    this.fileSystemStore.update((state) => ({
      folderPath: folder,
      dree: dreeScan,
    }));
  }
}
