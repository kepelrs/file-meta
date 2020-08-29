import { Injectable } from '@angular/core';
import { FileSystemQuery } from './file-system.query';
import * as dree from 'dree';
import { FileSystemStore } from './file-system.store';
import { DatabaseService } from '../db/database.service';
import { HashService } from '../services/hash.service';
import { DreeWithMetadata } from '../types';
import { Repository } from 'typeorm';
import { Metadata } from '../db/entities/metadata.entity';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { File } from '../db/entities/file.entity';
import { map, tap, filter } from 'rxjs/operators';
import { LAST_LOCATION_KEY } from '../constants';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private metadataRepo: Promise<Repository<Metadata>>;
  private fileRepo: Promise<Repository<File>>;

  constructor(
    private fileSystemStore: FileSystemStore,
    private fileSystemQuery: FileSystemQuery,
    private hashService: HashService,
    private dbService: DatabaseService,
    private routerQuery: RouterQuery,
    private router: Router
  ) {
    // setup repos
    this.metadataRepo = this.dbService.connection.then((c) =>
      c.getRepository(Metadata)
    );
    this.fileRepo = this.dbService.connection.then((c) =>
      c.getRepository(File)
    );

    // Watch route changes
    this.routerQuery
      .selectParams('encFolderPath')
      .pipe(
        tap((v) => {
          if (!v) {
            const folderPath = this.fileSystemQuery.getValue().folderPath;
            const encodedUrl = encodeURIComponent(folderPath);

            // TODO: Create reproduction fo this setTimeout for akita -> https://github.com/datorama/akita/issues/399
            setTimeout(() => {
              this.router.navigate([encodedUrl]);
            }, 0);
          }
        }),
        filter((v) => !!v),
        map((encFolderPath) => decodeURIComponent(encFolderPath))
      )
      .subscribe((decFolderPath: string) => {
        this.scanFs(decFolderPath);
      });
  }

  /**
   * WARNING: Has side effects.
   * TODO: Refactor functionality for proper semantics
   */
  private async getDreeWithHashAndMeta(
    folderPath: string
  ): Promise<DreeWithMetadata> {
    const metadataRepo = await this.metadataRepo;
    const fileRepo = await this.fileRepo;

    const dreeScan = dree.scan(folderPath, { hash: false, depth: 1 });
    const children: DreeWithMetadata[] = dreeScan.children || [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === 'file') {
        child.hash = await this.hashService.hashFile(child.path);
        child.metadata = await metadataRepo.findOne({
          hash: child.hash,
        });

        // Store file reference for future searches
        if (child.metadata) {
          await fileRepo.save(
            new File({
              path: child.path,
              metadata: child.metadata,
              parsedDreeData: child,
            })
          );
        }
      }
    }

    return dreeScan;
  }

  private async reScanFs() {
    const currentFolderPath = this.fileSystemStore.getValue().folderPath;
    await this.scanFs(currentFolderPath);
  }

  private async scanFs(folderPath: string) {
    const dreeScan = await this.getDreeWithHashAndMeta(folderPath);

    this.fileSystemStore.update(() => ({
      folderPath: folderPath,
      dree: dreeScan,
    }));
    window.localStorage.setItem(LAST_LOCATION_KEY, folderPath);
  }

  public async addMetadata(
    node: DreeWithMetadata,
    metadataContent: string,
    plainText: string
  ) {
    const metadataRepo = await this.metadataRepo;
    await metadataRepo.save({
      hash: node.hash,
      content: metadataContent || '',
      plainText,
    });

    await this.reScanFs();
  }
}
