import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNavigatorComponent } from './pages/file-navigator/file-navigator.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [FileNavigatorComponent],
  imports: [CommonModule, MatGridListModule],
  exports: [],
})
export class FileNavigatorModule {}
