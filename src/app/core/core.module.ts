import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCardComponent } from './components/file-card/file-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DreeToFileIcon } from './pipes/dree-to-file-icon.pipe';
import { MatIconModule } from '@angular/material/icon';
import { ManageMetadataComponent } from './components/manage-metadata/manage-metadata.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FileCardComponent, DreeToFileIcon, ManageMetadataComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    EditorModule,
    FormsModule,
  ],
  providers: [],
  exports: [FileCardComponent, DreeToFileIcon, ManageMetadataComponent],
  entryComponents: [ManageMetadataComponent],
})
export class CoreModule {}
