import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { SearchService } from '../../../../core/state/search.service';
import { SearchQuery } from '../../../../core/state/search.query';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  @ViewChild(SearchInputComponent, { static: false })
  searchInput: SearchInputComponent;

  constructor(
    private searchService: SearchService,
    public searchQuery: SearchQuery
  ) {}

  ngOnInit() {}

  onSearch() {
    this.searchService.searchMetadata(this.searchInput.keywords);
  }
}
