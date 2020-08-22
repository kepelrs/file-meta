import { Component, OnInit, Input } from '@angular/core';
import { DreeWithMetadata } from '../../types';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css'],
})
export class FileCardComponent implements OnInit {
  @Input() dreeNode: DreeWithMetadata;

  constructor() {}

  ngOnInit() {}

  manageMetadata(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    alert('TODO: Implement');
  }
}
