import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from '../../core/core.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [SearchResultsComponent, SearchInputComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    CoreModule,
    TranslocoModule,
  ],
})
export class SearchModule {}
