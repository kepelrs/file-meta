import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DatabaseService } from './core/db/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  async ngOnInit() {}

  goBack() {
    window.history.back();
  }

  reload() {
    window.location.reload();
  }
}
