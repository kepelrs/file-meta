import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import * as path from 'path';
import { TreeNode } from 'primeng/components/common/treenode';
import { Dree } from 'dree';
import { Metadata } from '../db/entities/metadata.entity';

/** Dree related types */
export type FsNode = GTreeNode<Dree & { nodeMetadata?: Metadata }>;
export interface GTreeNode<T = any> extends TreeNode {
  data: T;
  children?: GTreeNode<T>[];
}
/** */

export interface FileSystemState {
  currentFolder: {
    name: string;
    fullPath: string;
  };

  loadedTree: FsNode[];
}

export function createInitialState(): FileSystemState {
  const currentFolderPath = path.resolve('.');
  return {
    currentFolder: {
      name: path.basename(currentFolderPath),
      fullPath: currentFolderPath,
    },
    loadedTree: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'fileSystem' })
export class FileSystemStore extends Store<FileSystemState> {
  constructor() {
    super(createInitialState());
  }
}
