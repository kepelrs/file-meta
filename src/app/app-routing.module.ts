import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { FileNavigatorComponent } from './features/file-navigator/pages/file-navigator/file-navigator.component';
import { SearchResultsComponent } from './features/search/pages/search-results/search-results.component';

const routes: Routes = [
  { path: '', component: FileNavigatorComponent },
  { path: 'search/:encKeyword', component: SearchResultsComponent },
  { path: ':encFolderPath', component: FileNavigatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
