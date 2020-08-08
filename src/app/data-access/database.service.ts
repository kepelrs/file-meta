import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Settings } from './repositories/settings';
import { File } from './entities/file.entity';
import { Metadata } from './entities/metadata.entity';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public connection: Promise<Connection>;
  private readonly options: ConnectionOptions;

  constructor() {
    Settings.initialize();
    this.options = {
      type: 'sqlite',
      database: Settings.dbPath,
      entities: [File, Metadata],
      synchronize: true,
      logging: 'all',
    };
    this.connection = createConnection(this.options);
  }
}
