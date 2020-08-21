import { Injectable } from '@angular/core';
import { FileSystemQuery } from './file-system.query';
import * as dree from 'dree';
import { FileSystemStore } from './file-system.store';
import { DatabaseService } from '../db/database.service';
import { HashService } from '../services/hash.service';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  constructor(
    private fileSystemStore: FileSystemStore,
    private hashService: HashService
  ) {
    this.navigateToFolder(this.fileSystemStore.getValue().folderPath);
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

  public async navigateToFolder(folder: string) {
    const dreeScan = await this.getDreeWithHash(folder);
    this.fileSystemStore.update((state) => ({
      folderPath: folder,
      dree: dreeScan,
    }));
  }
}
