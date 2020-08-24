import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { File } from '../../../../core/db/entities/file.entity';
import { DreeWithMetadata } from '../../../../core/types';
import { Metadata } from '../../../../core/db/entities/metadata.entity';
import { DatabaseService } from '../../../../core/db/database.service';
import { Like, Not, In } from 'typeorm';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  @ViewChild(SearchInputComponent, { static: false })
  searchInput: SearchInputComponent;

  searchResults: DreeWithMetadata[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {}

  private async searchMetadata(keywords: string[]) {
    const connection = await this.dbService.connection;
    const metadataRepo = connection.getRepository(Metadata);

    const results: DreeWithMetadata[] = [];
    const metaHashesTaken = new Set();
    for (const keyword of keywords) {
      const matches = await metadataRepo.find({
        where: {
          plainText: Like(`%${keyword}%`),
        },
        relations: ['files'],
      });

      for (const match of matches) {
        if (metaHashesTaken.has(match.hash)) {
          continue;
        }

        const metadata = match;
        const drees = match.files.map((f) => ({
          ...f.parsedDreeData,
          metadata,
        }));

        results.push(...drees);
        metaHashesTaken.add(match.hash);
      }
    }

    this.searchResults = results;
    console.log(results);
    console.log(this.searchResults);
  }

  private trimInvalidFiles() {}

  onSearch() {
    const keyWords = this.searchInput.keywords;
    this.searchMetadata(keyWords);
  }
}
