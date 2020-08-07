import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DatabaseService } from './data-access/database.service';
import { FileMeta } from './data-access/entities/file-meta.entity';
import {
  GTreeNode,
  FsStats,
} from './components/table-view/table-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  fileMetas: FileMeta[] = [];

  constructor(private databaseService: DatabaseService) {}

  async ngOnInit() {
    this.getFileMetas();
  }

  getFileMetas() {
    this.databaseService.connection
      .then(() => FileMeta.find())
      .then((fileMetas) => {
        this.fileMetas = fileMetas;
      });
  }
}
