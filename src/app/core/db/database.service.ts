import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Settings } from './repositories/settings';
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
      entities: [Metadata],
      synchronize: true,
      // logging: 'all',
    };
    this.connection = createConnection(this.options);
  }
}
