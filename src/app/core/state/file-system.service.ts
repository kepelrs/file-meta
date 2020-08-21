import { Injectable } from '@angular/core';
import { FileSystemQuery } from './file-system.query';
import * as dree from 'dree';
import { FileSystemStore } from './file-system.store';
import { DatabaseService } from '../db/database.service';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  constructor(
    private fileSystemStore: FileSystemStore,
    private fileSystemQuery: FileSystemQuery,
    private databaseService: DatabaseService
  ) {
    this.navigateToFolder(this.fileSystemStore.getValue().folderPath);
  }

  public navigateToFolder(folder: string) {
    this.fileSystemStore.update((state) => ({
      folderPath: folder,
      dree: dree.scan(folder, { depth: 1 }),
    }));
  }
}
