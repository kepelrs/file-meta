import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCardComponent } from './components/file-card/file-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DreeToFileIcon } from './pipes/dree-to-file-icon.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [FileCardComponent, DreeToFileIcon],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [],
  exports: [FileCardComponent, DreeToFileIcon],
})
export class CoreModule {}
