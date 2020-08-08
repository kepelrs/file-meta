import { Injectable } from '@angular/core';
import { FileSystemQuery } from './file-system.query';
import * as dree from 'dree';
import { FileSystemStore, FsNode } from './file-system.store';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  constructor(
    private fileSystemStore: FileSystemStore,
    private fileSystemQuery: FileSystemQuery
  ) {
    this.loadInitialStore();
  }

  private dreeWalkToFsNode(dreeWalk: dree.Dree): FsNode {
    // Retrieve the property names defined on object
    const { children: dreeChildren, ...data } = dreeWalk;

    let children: FsNode[];
    if (dreeChildren) {
      children = dreeChildren.map((dc) => this.dreeWalkToFsNode(dc));
      children.sort((c1, c2) =>
        // sort first by type, then by name
        c1.data.type !== c2.data.type
          ? c1.data.type > c2.data.type
            ? 1
            : -1
          : c1.data.name > c2.data.name
          ? 1
          : -1
      );
    }

    return { data, children };
  }

  private async loadInitialStore() {
    console.time('loadDree');
    const dreeWalk = dree.scan('.', { hash: false });

    this.fileSystemStore.update((state) => ({
      ...state,
      loadedTree: this.dreeWalkToFsNode(dreeWalk).children,
    }));
    console.timeEnd('loadDree');
  }

  // lazyLoadTree() {

  //   this.fileSystemStore.
  // }
}
