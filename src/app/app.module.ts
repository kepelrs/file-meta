import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TreeTableModule } from 'primeng/treetable';

import { AppComponent } from './app.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { AppRoutingModule } from './app-routing.module';
import { PrettyJsonPipe } from './core/pipes/pretty-json.pipe';
import { FileSystemQuery } from './core/state/file-system.query';
import { FileSystemStore } from './core/state/file-system.store';
import { FileSystemService } from './core/state/file-system.service';

@NgModule({
  declarations: [
    AppComponent,
    PrettyJsonPipe,
    TableViewComponent,
    PrettyJsonPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    TreeTableModule,
  ],
  providers: [FileSystemQuery, FileSystemStore, FileSystemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
