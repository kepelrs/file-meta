import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { FileNavigatorComponent } from './features/file-navigator/pages/file-navigator/file-navigator.component';
import { SearchResultsComponent } from './features/search/pages/search-results/search-results.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/.' },
  { path: 'search', component: SearchResultsComponent },
  { path: ':encFolderPath', component: FileNavigatorComponent },
  { path: '**', redirectTo: '/.' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
