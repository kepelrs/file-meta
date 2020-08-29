import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import * as path from 'path';
import { DreeWithMetadata } from '../types';
import { LAST_LOCATION_KEY } from '../constants';

export interface FileSystemState {
  folderPath: string;
  dree: DreeWithMetadata;
}

export function createInitialState(): FileSystemState {
  const currentFolderPath = path.resolve(
    window.localStorage.getItem(LAST_LOCATION_KEY) || '.'
  );

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
