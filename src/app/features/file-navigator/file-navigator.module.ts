import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNavigatorComponent } from './pages/file-navigator/file-navigator.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [FileNavigatorComponent],
  imports: [CoreModule, CommonModule, MatGridListModule],
  exports: [],
})
export class FileNavigatorModule {}
