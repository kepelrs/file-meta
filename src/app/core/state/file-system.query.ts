import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FileSystemStore, FileSystemState } from './file-system.store';
import * as path from 'path';
import { map, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import * as dree from 'dree';

@Injectable({ providedIn: 'root' })
export class FileSystemQuery extends Query<FileSystemState> {
  folderPath$ = this.select('folderPath');
  folderName = this.select('folderPath').pipe(
    map((currentFolderPath) => path.basename(currentFolderPath))
  );
  dree$ = this.select('dree').pipe(skipWhile((v) => !v));

  constructor(protected store: FileSystemStore) {
    super(store);
  }
}
