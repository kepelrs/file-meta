import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'primeng/components/common/treenode';
import { FileWalkService } from '../../core/services/file-walk.service';

export interface GTreeNode<T = any> extends TreeNode {
  data: T;
  children?: GTreeNode<T>[];
}

export interface FsStats {
  name: string;
  size: string;
  type: string;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() treeNodes: GTreeNode<FsStats>[] = [];

  cols: any[];

  constructor(private fileWalkService: FileWalkService) {}

  async ngOnInit() {
    this.treeNodes = [];

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];

    await this.fileWalkService.loadFiles();
    this.treeNodes = this.fileWalkService.walkAsTree;
  }
}
