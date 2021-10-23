import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { DreeWithMetadata } from '../../types';
import { Metadata } from '../../db/entities/metadata.entity';
import { FileSystemService } from '../../state/file-system.service';
import { DatabaseService } from '../../db/database.service';

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
    private databaseService: DatabaseService,
    private fileSystemService: FileSystemService
  ) {}

  async ngOnInit() {
    const dreeNode = this.config.data;

    this.dreeNode = {
      ...dreeNode,
      metadata: await this.getNodeMetadata(dreeNode),
    };
    this.metadataContent = this.dreeNode.metadata.content;
  }

  /** Loads from db, or returns an empty metadata */
  private async getNodeMetadata(dreeNode: DreeWithMetadata): Promise<Metadata> {
    const metadataRepo = (await this.databaseService.connection).getRepository(
      Metadata
    );
    const metadata = await metadataRepo.findOne({ hash: dreeNode.hash });

    if (metadata) {
      return metadata;
    }

    return new Metadata({
      hash: dreeNode.hash,
    });
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

    this.fileSystemService.saveOrRemoveMetadata(
      this.dreeNode,
      this.metadataContent,
      normalizedWhiteSpace
    );
    this.ref.close();
  }
}
