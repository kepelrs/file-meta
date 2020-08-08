import { Component, OnInit, Input } from '@angular/core';
import { FileSystemQuery } from '../../core/state/file-system.query';
import { FsNode } from '../../core/state/file-system.store';
import { FileSystemService } from '../../core/state/file-system.service';
import { DatabaseService } from '../../data-access/database.service';
import { File } from '../../data-access/entities/file.entity';
import { Dree } from 'dree';

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
    public fileSystemQuery: FileSystemQuery,
    private databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    this.treeNodes = [];

    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'size', header: 'Tamanho' },
      { field: 'type', header: 'Tipo' },
    ];
  }

  async createMeta(rowData: Dree) {
    console.log(rowData);

    const connection = await this.databaseService.connection;
    const repo = connection.getRepository(File);
    repo.save({ name: rowData.name, size: rowData.size, path: rowData.path });
  }
}
