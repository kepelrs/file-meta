import { Injectable } from '@angular/core';
import { SearchStore } from './search.store';
import { DatabaseService } from '../db/database.service';
import { DreeWithMetadata } from '../types';
import { Repository, Like, In } from 'typeorm';
import { Metadata } from '../db/entities/metadata.entity';
import { SearchQuery } from './search.query';
import * as fs from 'fs';
import { File } from '../db/entities/file.entity';
const fsPromise = fs.promises;

@Injectable({ providedIn: 'root' })
export class SearchService {
  private metadataRepo: Promise<Repository<Metadata>>;
  private fileRepo: Promise<Repository<File>>;

  constructor(
    private searchStore: SearchStore,
    private searchQuery: SearchQuery,
    private dbService: DatabaseService
  ) {
    this.metadataRepo = this.dbService.connection.then((c) =>
      c.getRepository(Metadata)
    );

    this.fileRepo = this.dbService.connection.then((c) =>
      c.getRepository(File)
    );

    this.searchQuery.results$.subscribe((results) =>
      this.removeInvalidResults(results)
    );
  }

  private async removeInvalidResults(results: DreeWithMetadata[]) {
    const pathsToRemote: { [path: string]: true } = {};
    let shouldFilter = false;
    for (const result of results) {
      try {
        await fsPromise.access(result.path);
        // The check succeeded
      } catch (error) {
        // The check failed
        pathsToRemote[result.path] = true;
        shouldFilter = true;
      }
    }

    if (!shouldFilter) {
      return;
    }

    // update store
    const filteredResults = results.filter((r) => !pathsToRemote[r.path]);
    this.searchStore.update((state) => ({ results: filteredResults }));

    // unlink on db (but not deleting)
    (await this.fileRepo).update(
      { path: In(Object.keys(pathsToRemote)) },
      { metadata: null }
    );
  }

  clearResults() {
    this.searchStore.update((state) => ({ results: [] }));
  }

  async searchMetadata(keywords: string[]) {
    const metadataRepo = await this.metadataRepo;
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

    this.searchStore.update(() => ({ results }));
  }
}
