import { Injectable } from '@angular/core';
import { FileSystemQuery } from './file-system.query';
import * as dree from 'dree';
import { FileSystemStore, FsNode } from './file-system.store';
import { DatabaseService } from '../db/database.service';
import { File } from '../db/entities/file.entity';
import { CustomFsRepo } from '../db/repositories/fs.repo';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private nodeMap: { [path: string]: FsNode } = {};

  constructor(
    private fileSystemStore: FileSystemStore,
    private fileSystemQuery: FileSystemQuery,
    private databaseService: DatabaseService
  ) {
    this.loadInitialStore();
  }

  private dreeWalkToFsNode(dreeWalk: dree.Dree): FsNode {
    // Retrieve the property names defined on object
    const { children: dreeChildren, ...data } = dreeWalk;

    const children: FsNode[] = [];
    if (dreeChildren) {
      for (const child of dreeChildren) {
        const childAsFsNode = this.dreeWalkToFsNode(child);

        children.push(childAsFsNode);
        this.nodeMap[childAsFsNode.data.path] = childAsFsNode;
      }

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
    const dreeWalk = dree.scan('.', { hash: true, depth: 2 });

    const rootNodesAndChildren = this.dreeWalkToFsNode(dreeWalk).children;
    console.log(rootNodesAndChildren);

    this.fileSystemStore.update((state) => ({
      ...state,
      loadedTree: rootNodesAndChildren,
      nodeMap: this.nodeMap,
    }));

    this.loadNodeMetadata(rootNodesAndChildren);
    console.timeEnd('loadDree');
  }

  async loadNodeMetadata(node: FsNode | FsNode[]) {
    // if (!Array.isArray(node)) {
    //   node = [node];
    // }
    // const connection = await this.databaseService.connection;
    // const pathAndSizes: { path: string; sizeInBytes: number }[] = [];
    // console.time('regular');
    // for (const n of node) {
    //   const pathAndSize = {
    //     path: n.data.path || '',
    //     sizeInBytes: n.data.sizeInBytes,
    //   };
    //   pathAndSizes.push(pathAndSize);
    //   const fileWithMetadata = await connection.getRepository(File).findOne({
    //     where: pathAndSize,
    //     relations: ['metadata'],
    //   });
    //   if (fileWithMetadata) {
    //     console.log(fileWithMetadata);
    //   }
    //   this.nodeMap[n.data.path].data.nodeMetadata =
    //     fileWithMetadata && fileWithMetadata.metadata;
    // }
    // console.timeEnd('regular');
    // const fileWithMetadata2 = await connection
    //   .getCustomRepository(CustomFsRepo)
    //   .filesHaveMetadata(pathAndSizes);
    // console.log(this);
    // this.fileSystemStore.update((state) => ({ ...state }));
  }
}
