import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileSystemQuery } from '../../../../core/state/file-system.query';
import { FileSystemService } from '../../../../core/state/file-system.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Dree } from 'dree';
import { DreeWithMetadata } from '../../../../core/types';
import { DatabaseService } from '../../../../core/db/database.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-file-navigator',
  templateUrl: './file-navigator.component.html',
  styleUrls: ['./file-navigator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileNavigatorComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 1, rows: 1, color: '#DDBDF1' },
    { text: 'Five', cols: 1, rows: 1, color: '#DDBDF1' },
  ];

  dreeChildren$: Observable<any>;

  constructor(
    private router: Router,
    private fileSystemService: FileSystemService,
    public fileSystemQuery: FileSystemQuery
  ) {}

  ngOnInit() {
    this.dreeToFsNodes();
  }

  private dreeToFsNodes() {
    this.dreeChildren$ = this.fileSystemQuery.dree$.pipe(
      map((dree) => dree.children || []),
      map((children) =>
        // folders first, then alphabetically
        children.sort((c1, c2) =>
          c1.type === c2.type
            ? c1.name > c2.name
              ? 1
              : -1
            : c1.type > c2.type
            ? 1
            : -1
        )
      )
    );
  }

  public navigateTo(child: DreeWithMetadata) {
    this.router.navigate([encodeURIComponent(child.path)]);
  }
}
