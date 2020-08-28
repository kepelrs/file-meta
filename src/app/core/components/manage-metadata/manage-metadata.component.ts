import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { DreeWithMetadata } from '../../types';
import { Metadata } from '../../db/entities/metadata.entity';
import { FileSystemService } from '../../state/file-system.service';

@Component({
  selector: 'app-manage-metadata',
  templateUrl: './manage-metadata.component.html',
  styleUrls: ['./manage-metadata.component.scss'],
})
export class ManageMetadataComponent implements OnInit {
  dreeNode: DreeWithMetadata;
  metadataContent = '';

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fileSystemService: FileSystemService
  ) {}

  ngOnInit() {
    const dreeNode = this.config.data;

    this.dreeNode = {
      ...dreeNode,
      metadata: dreeNode.metadata || {
        content: '',
        hash: dreeNode.hash,
        sizeInBytes: dreeNode.sizeInBytes,
      },
    };
    this.metadataContent = this.dreeNode.metadata.content;
  }

  onCancel() {
    this.ref.close();
  }

  onSave() {
    const editorBox: HTMLDivElement = document.querySelector(
      'p-editor div.ql-editor'
    );
    const plainText = (editorBox && editorBox.innerText) || '';
    const normalizedWhiteSpace = plainText.replace(/\s\s+/g, ' ');

    this.fileSystemService.addMetadata(
      this.dreeNode,
      this.metadataContent,
      normalizedWhiteSpace
    );
    this.ref.close();
  }
}
