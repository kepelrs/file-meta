import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'primeng/components/common/treenode';

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

  constructor() {}

  ngOnInit() {
    this.treeNodes = [
      {
        data: {
          name: 'Documents',
          size: '75kb',
          type: 'Folder',
        },
        children: [
          {
            data: {
              name: 'Work',
              size: '55kb',
              type: 'Folder',
            },
            children: [
              {
                data: {
                  name: 'Expenses.doc',
                  size: '30kb',
                  type: 'Document',
                },
              },
              {
                data: {
                  name: 'Resume.doc',
                  size: '25kb',
                  type: 'Resume',
                },
              },
            ],
          },
          {
            data: {
              name: 'Home',
              size: '20kb',
              type: 'Folder',
            },
            children: [
              {
                data: {
                  name: 'Invoices',
                  size: '20kb',
                  type: 'Text',
                },
              },
            ],
          },
        ],
      },
      {
        data: {
          name: 'Pictures',
          size: '150kb',
          type: 'Folder',
        },
        children: [
          {
            data: {
              name: 'barcelona.jpg',
              size: '90kb',
              type: 'Picture',
            },
          },
          {
            data: {
              name: 'primeui.png',
              size: '30kb',
              type: 'Picture',
            },
          },
          {
            data: {
              name: 'optimus.jpg',
              size: '30kb',
              type: 'Picture',
            },
          },
        ],
      },
    ];

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];
  }
}
