import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DreeWithMetadata } from '../../types';
import { DialogService } from 'primeng/api';
import { ManageMetadataComponent } from '../manage-metadata/manage-metadata.component';
import { shell } from 'electron';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css'],
  providers: [DialogService],
})
export class FileCardComponent implements OnInit {
  @Input() dreeNode: DreeWithMetadata;
  @Input() mode: 'allow-metadata' | 'details-view';

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {}

  manageMetadata(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.openDialog();
  }

  openDialog() {
    const ref = this.dialogService.open(ManageMetadataComponent, {
      header: this.translocoService.translate('metadata-editor.box-title'),
      width: '85%',
      data: this.dreeNode,
      closable: false,
    });
  }

  openFile(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.dreeNode.type === 'file') {
      shell.openPath(this.dreeNode.path);
    } else {
      this.router.navigate([encodeURIComponent(this.dreeNode.path)]);
    }
  }
}
