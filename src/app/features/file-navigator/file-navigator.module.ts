import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNavigatorComponent } from './pages/file-navigator/file-navigator.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from '../../core/core.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavControlsComponent } from './components/nav-controls/nav-controls.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FileNavigatorComponent, NavControlsComponent],
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [],
})
export class FileNavigatorModule {}
