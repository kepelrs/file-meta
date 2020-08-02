import { Component, OnInit, Input } from '@angular/core';

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
  @Input() treeNodes = [];
}
