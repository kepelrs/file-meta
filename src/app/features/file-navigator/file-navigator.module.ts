import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNavigatorComponent } from './pages/file-navigator/file-navigator.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from '../../core/core.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FileNavigatorComponent],
  imports: [
    CoreModule,
    CommonModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [],
})
export class FileNavigatorModule {}
