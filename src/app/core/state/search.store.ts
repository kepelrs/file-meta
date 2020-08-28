import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { DreeWithMetadata } from '../types';

export interface SearchState {
  results: DreeWithMetadata[];
}

export function createInitialState(): SearchState {
  return {
    results: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'search' })
export class SearchStore extends Store<SearchState> {
  constructor() {
    super(createInitialState());
  }
}
