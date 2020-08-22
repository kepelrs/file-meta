import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileNavigatorComponent } from './pages/file-navigator/file-navigator.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

@NgModule({
  declarations: [FileNavigatorComponent, SearchResultsComponent],
  imports: [CommonModule, MatGridListModule],
  exports: [],
})
export class FileNavigatorModule {}
