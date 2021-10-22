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
          if (v === '.') {
            const fullPath = this.fileSystemQuery.getValue().folderPath;

            // TODO: Create reproduction fo this setTimeout for akita -> https://github.com/datorama/akita/issues/399
            setTimeout(() => {
              this.router.navigate([encodeURIComponent(fullPath)]);
            }, 0);
          }
        }),
        filter((v) => !!v && v !== '.'),
        map((encFolderPath) => decodeURIComponent(encFolderPath))
      )
      .subscribe((decFolderPath: string) => {
        this.scanFs(decFolderPath);
      });

    this.loadFileHashes();
  }

  private async loadFileHashes() {
    const metadataRepo = await this.metadataRepo;
    const metadatas = await metadataRepo.find({ select: ['hash'] });
    const hashes = metadatas.map((v) => v.hash);
    this.fileSystemStore.update((state) => ({
      ...state,
      existingFileHashes: new Set(hashes),
    }));
  }

  /** Creates or updates file and metadata relation if the metadata exists */
  private async mapFilesAndLoadMetadatas(
    child: DreeWithMetadata,
    metadataRepo: Repository<Metadata>,
    fileRepo: Repository<File>,
    existingFileHashes: Set<string>
  ) {
    try {
      if (child.type === 'file') {
        child.hash = this.hashService.hashFileSync(child.path);

        if (existingFileHashes.has(child.hash)) {
          const metadata = await metadataRepo.findOne(child.hash);
          child.metadata = metadata;
          await fileRepo.save(
            new File({
              path: child.path,
              metadata,
              parsedDreeData: child,
            })
          );
        }
      }
    } catch (error) {
      console.log('Error associating metadata. Path:  ', child.path);
      console.log('Error associating metadata. Error: ', error);
    }
  }

  /**
   * WARNING: Has side effects.
   */
  private async createDreeWithMetadata(
    folderPath: string
  ): Promise<DreeWithMetadata> {
    const fileRepo = await this.fileRepo;
    const metadataRepo = await this.metadataRepo;
    const { existingFileHashes } = this.fileSystemStore.getValue();

    const dreeScan = dree.scan(folderPath, { hash: false, depth: 1 });
    const children: DreeWithMetadata[] = dreeScan.children || [];

    const now = String(Date.now());
    const timerName = `${now} hashing files took: `;
    /* tslint:disable-next-line */
    console.time(timerName);

    for (let i = 0; i < children.length; i++) {
      // TODO: await and continue perf improvements on massive flat folders.
      /* await */ this.mapFilesAndLoadMetadatas(
        children[i],
        metadataRepo,
        fileRepo,
        existingFileHashes
      );
    }

    /* tslint:disable-next-line */
    console.timeEnd(timerName);
    console.log(`folder size: ${children.length}`);

    return dreeScan;
  }

  private async scanFs(folderPath: string) {
    const dreeScan = await this.createDreeWithMetadata(folderPath);

    this.fileSystemStore.update(() => ({
      folderPath: folderPath,
      dree: dreeScan,
    }));
    window.localStorage.setItem(LAST_LOCATION_KEY, folderPath);
  }

  public async reScanFs() {
    const currentFolderPath = this.fileSystemStore.getValue().folderPath;
    await this.scanFs(currentFolderPath);
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

    this.fileSystemStore.update((state) => {
      const hashes = state.existingFileHashes;
      hashes.add(node.hash);
      return state;
    });

    await this.reScanFs();
  }
}
