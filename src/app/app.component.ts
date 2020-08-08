import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DatabaseService } from './data-access/database.service';
import { File } from './data-access/entities/file.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  fileMetas: File[] = [];

  constructor(private databaseService: DatabaseService) {}

  async ngOnInit() {
    this.getFileMetas();
  }

  getFileMetas() {
    this.databaseService.connection
      .then(() => File.find())
      .then((fileMetas) => {
        this.fileMetas = fileMetas;
      });
  }
}
