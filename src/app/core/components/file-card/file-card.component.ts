import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DreeWithMetadata } from '../../types';
import { DialogService } from 'primeng/api';
import { ManageMetadataComponent } from '../manage-metadata/manage-metadata.component';
import { shell } from 'electron';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css'],
  providers: [DialogService],
})
export class FileCardComponent implements OnInit {
  @Input() dreeNode: DreeWithMetadata;
  @Input() mode: 'allow-metadata' | 'details-view';

  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  manageMetadata(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.dreeNode.metadata) {
      this.openDialog();
    } else {
      this.openDialog();
    }
  }

  openDialog() {
    const ref = this.dialogService.open(ManageMetadataComponent, {
      header: 'Metadados do arquivo',
      width: '85%',
      data: this.dreeNode,
      closable: false,
    });
  }

  openFile() {
    if (this.dreeNode.type === 'file') {
      shell.openItem(this.dreeNode.path);
    }
  }
}
