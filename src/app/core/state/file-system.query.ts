import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FileSystemStore, FileSystemState } from './file-system.store';

@Injectable({ providedIn: 'root' })
export class FileSystemQuery extends Query<FileSystemState> {
  currentFolder$ = this.select('currentFolder');
  fsNodes$ = this.select('loadedTree');

  constructor(protected store: FileSystemStore) {
    super(store);
  }
}
