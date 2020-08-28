import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SearchStore, SearchState } from './search.store';

@Injectable({ providedIn: 'root' })
export class SearchQuery extends Query<SearchState> {
  results$ = this.select('results');

  constructor(protected store: SearchStore) {
    super(store);
  }
}
