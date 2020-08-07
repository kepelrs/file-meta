import { Injectable } from '@angular/core';
import { promises as fs, Stats } from 'fs';
import * as md5File from 'md5-file';
import * as walkdir from 'walkdir';
import { TreeNode } from 'primeng/components/common/treenode';
import {
  GTreeNode,
  FsStats,
} from '../../components/table-view/table-view.component';

interface ExtendedStats extends Stats {
  $isDirectory: boolean;
  $isSymbolicLink: boolean;
  isDirectory: () => boolean;
  isSymbolicLink: () => boolean;
}

interface ExtendedWalk {
  [path: string]: ExtendedStats;
}

@Injectable({
  providedIn: 'root',
})
export class FileWalkService {
  private extendedWalk: ExtendedWalk = {};
  public walkAsTree: GTreeNode<FsStats>[] = [];

  constructor() {
    this.loadFiles();
  }

  async loadFiles() {
    console.time('loadFiles')

    const targetDir = './node_modules';
    const tree = ((await walkdir.async(targetDir, {
      return_object: true,
      // max_depth: 2,
    })) as unknown) as ExtendedWalk;

    for (const key of Object.keys(tree)) {
      tree[key].$isDirectory = tree[key].isDirectory();
      tree[key].$isSymbolicLink = tree[key].isSymbolicLink();
    }
    this.filesToTreeNodes();
    this.extendedWalk = tree;

    console.timeEnd('loadFiles')
  }

  private filesToTreeNodes() {
    const treeNodes: GTreeNode<FsStats>[] = [];
    for (const key of Object.keys(this.extendedWalk)) {
      const stat = this.extendedWalk[key];
      const node: GTreeNode<FsStats> = {
        data: {
          name: key.split('/').slice(-1).join(''),
          size: String(stat.size),
          type: stat.$isDirectory ? 'Pasta' : 'Arquivo',
        },
        children: [
          {
            data: {
              name: key.split('/').slice(-1).join(''),
              size: String(stat.size),
              type: stat.$isDirectory ? 'Pasta' : 'Arquivo',
            },
            children: [
              {
                data: {
                  name: key.split('/').slice(-1).join(''),
                  size: String(stat.size),
                  type: stat.$isDirectory ? 'Pasta' : 'Arquivo',
                },
              },
            ],
          },
        ],
      };
      treeNodes.push(node);
      this.walkAsTree = treeNodes;
    }
  }
}
