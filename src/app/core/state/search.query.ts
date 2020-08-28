import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SearchStore, SearchState } from './search.store';
import { DreeWithMetadata } from '../types';
import { shareReplay, share, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchQuery extends Query<SearchState> {
  results$ = this.select('results');

  resultsByFolder$ = this.results$.pipe(
    map((results) => this.getResultsByFolder(results)),
    shareReplay()
  );

  resultsFolders$ = this.resultsByFolder$.pipe(
    map((resultsByFolder) => Object.keys(resultsByFolder) || []),
    shareReplay()
  );

  constructor(protected store: SearchStore) {
    super(store);
  }

  getResultsByFolder(results: DreeWithMetadata[]) {
    const resultsByFolder: { [folder: string]: DreeWithMetadata[] } = {};

    for (const result of results) {
      const name = result.name;
      const folder = result.path.slice(0, -name.length);
      const folderDrees = resultsByFolder[folder] || [];
      resultsByFolder[folder] = [...folderDrees, result];
    }
    return resultsByFolder;
  }
}
