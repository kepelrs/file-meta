import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import * as path from 'path';
import { Dree } from 'dree';

export interface FileSystemState {
  folderPath: string;
  dree: Dree;
}

export function createInitialState(): FileSystemState {
  const currentFolderPath = path.resolve('.');

  return {
    folderPath: currentFolderPath,
    dree: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'fileSystem' })
export class FileSystemStore extends Store<FileSystemState> {
  constructor() {
    super(createInitialState());
  }
}
