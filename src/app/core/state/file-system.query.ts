import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import * as path from 'path';
import { map, skipWhile } from 'rxjs/operators';
import { FileSystemState, FileSystemStore } from './file-system.store';

@Injectable({ providedIn: 'root' })
export class FileSystemQuery extends Query<FileSystemState> {
  folderPath$ = this.select('folderPath');
  existingFileHashes$ = this.select('existingFileHashes');
  folderName$ = this.select('folderPath').pipe(
    map((currentFolderPath) => path.basename(currentFolderPath))
  );
  dree$ = this.select('dree').pipe(skipWhile((v) => !v));

  constructor(protected store: FileSystemStore) {
    super(store);
  }
}
