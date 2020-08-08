import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'primeng/components/common/treenode';
import { FileSystemQuery } from '../../core/state/file-system.query';
import { GTreeNode, FsStats, FsNode } from '../../core/state/file-system.store';
import { FileSystemService } from '../../core/state/file-system.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  treeNodes: FsNode[] = [];

  cols: any[];

  constructor(
    private fileSystemService: FileSystemService,
    public fileSystemQuery: FileSystemQuery
  ) {}

  async ngOnInit() {
    this.treeNodes = [];

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];
  }
}
