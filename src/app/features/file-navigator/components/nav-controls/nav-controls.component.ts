import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-controls',
  templateUrl: './nav-controls.component.html',
  styleUrls: ['./nav-controls.component.scss'],
})
export class NavControlsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public goBack() {
    if (window.history.length < 2) {
      // Do not go back when no history exists: it would just refresh the app
      return;
    }
    window.history.back();
  }

  public reload() {
    window.location.reload();
  }
}
