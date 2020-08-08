import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FileSystemStore, FsNode, FsStats } from './file-system.store';
import * as walkdir from 'walkdir';
import { FileSystemQuery } from './file-system.query';
import { Stats } from 'fs';
import * as path from 'path';

export interface ExtendedWalk {
  [path: string]: FsStats;
}

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  constructor(
    private fileSystemStore: FileSystemStore,
    private fileSystemQuery: FileSystemQuery
  ) {
    this.loadInitialStore();
  }

  private extendWalk(walk: { [path: string]: Stats }): FsNode[] {
    const tree = ({ ...walk } as unknown) as ExtendedWalk;
    const nodes: FsNode[] = [];
    for (const key of Object.keys(tree)) {
      const data = tree[key];
      data.name = path.basename(key);
      data.path = key;
      data.$isDirectory = data.isDirectory();
      data.$isSymbolicLink = data.isSymbolicLink();
      data.type = data.$isDirectory ? 'Pasta' : 'Arquivo';
      nodes.push({ data, children: [] });
    }
    return nodes;
  }

  private async loadInitialStore() {
    const walk = await walkdir.async('.', {
      // TODO get dynamic path selected by user
      return_object: true,
      no_recurse: true,
    });

    const rootNodes = this.extendWalk(walk);
    this.fileSystemStore.update((state) => ({
      ...state,
      loadedTree: rootNodes,
    }));
  }
  // lazyLoadTree() {

  //   this.fileSystemStore.
  // }
}
