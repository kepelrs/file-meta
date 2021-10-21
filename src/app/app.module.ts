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
import { AppRoutingModule } from './app-routing.module';
import { FileSystemQuery } from './core/state/file-system.query';
import { FileSystemStore } from './core/state/file-system.store';
import { FileSystemService } from './core/state/file-system.service';
import { ButtonModule } from 'primeng/button';
import { FileNavigatorModule } from './features/file-navigator/file-navigator.module';
import { CoreModule } from './core/core.module';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { SearchModule } from './features/search/search.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AkitaNgRouterStoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    FileNavigatorModule,
    SearchModule,
    AppRoutingModule,
    TreeTableModule,
    ButtonModule,
    DynamicDialogModule,
    HttpClientModule,
    TranslocoRootModule,
    MatSelectModule,
  ],
  providers: [FileSystemQuery, FileSystemStore, FileSystemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
