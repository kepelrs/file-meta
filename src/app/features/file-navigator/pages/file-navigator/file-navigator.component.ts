import { Component, OnInit } from '@angular/core';
import { FileSystemQuery } from '../../../../core/state/file-system.query';
import { FileSystemService } from '../../../../core/state/file-system.service';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { DreeWithMetadata } from '../../../../core/types';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-file-navigator',
  templateUrl: './file-navigator.component.html',
  styleUrls: ['./file-navigator.component.scss'],
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

  dreeChildren$: Observable<DreeWithMetadata[]>;
  filteredChildren$: Observable<DreeWithMetadata[]>;

  filterInput = new FormControl('');

  constructor(
    public fileSystemService: FileSystemService, // must be imported even if unused, in order to instantiate: https://github.com/angular/angular/issues/25633#issuecomment-649715014
    public fileSystemQuery: FileSystemQuery
  ) {}

  ngOnInit() {
    this.displayDreeNodes();
  }

  private displayDreeNodes() {
    // Sort alphabetically
    this.dreeChildren$ = this.fileSystemQuery.dree$.pipe(
      tap((_) => this.filterInput.setValue('')),
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

    // Apply filters when there are any
    const filterValueObs = this.filterInput.valueChanges.pipe(startWith(''));
    this.filteredChildren$ = combineLatest([
      this.dreeChildren$,
      filterValueObs,
    ]).pipe(
      map(([nodes, keyword]) => {
        return nodes.filter((node) => {
          if (!keyword) {
            return true;
          }

          const lowerName = node.name.toLowerCase();
          const lowerMeta = (
            (node.metadata && node.metadata.plainText) ||
            ''
          ).toLowerCase();
          return lowerName.includes(keyword) || lowerMeta.includes(keyword);
        });
      })
    );
  }
}
