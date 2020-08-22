import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DatabaseService } from './core/db/database.service';
import { Router } from '@angular/router';
import { FileSystemService } from './core/state/file-system.service';
import { FileSystemQuery } from './core/state/file-system.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private fileSystemQuery: FileSystemQuery
  ) {}

  async ngOnInit() {}

  get pageTitle() {
    if (this.router.url.startsWith('/search')) {
      return 'Pesquisa';
    }
    return 'Navegador';
  }

  toFileNavigator() {
    console.log(this.router.url);
    this.router.navigateByUrl(
      `/${encodeURIComponent(this.fileSystemQuery.getValue().folderPath)}`
    );
  }

  toSearch() {
    this.router.navigateByUrl(`/search`);
  }
}
