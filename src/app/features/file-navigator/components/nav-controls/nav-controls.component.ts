import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { filter, map, tap, take } from 'rxjs/operators';
import * as fs from 'fs';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { FileSystemService } from '../../../../core/state/file-system.service';
import { FileSystemQuery } from '../../../../core/state/file-system.query';
import * as path from 'path';
const fsPromise = fs.promises;

@Component({
  selector: 'app-nav-controls',
  templateUrl: './nav-controls.component.html',
  styleUrls: ['./nav-controls.component.scss'],
})
export class NavControlsComponent implements OnInit, AfterViewInit, OnDestroy {
  private subSink = new SubSink();
  @ViewChild('navPath', { static: false }) input: ElementRef;

  currentRoute = this.routerQuery.selectParams('encFolderPath').pipe(
    filter((v) => !!v),
    map((v) => decodeURIComponent(v))
  );

  parentFolder = this.currentRoute.pipe(map((v) => path.dirname(v)));

  constructor(
    private routerQuery: RouterQuery,
    private router: Router,
    private fileSystemService: FileSystemService,
    private fileSystemQuery: FileSystemQuery
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.subSink.sink = this.currentRoute.subscribe((_) => {
      const inputElement: HTMLInputElement = this.input.nativeElement;
      setTimeout(() => {
        inputElement.scrollLeft = 9999;
      }, 0);
    });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  private async navigate(path: string) {
    try {
      // The check succeeded
      await fsPromise.access(path);
      this.router.navigate([encodeURIComponent(path)]);
    } catch (error) {
      // The check failed, do nothing
    }
  }

  onKeyUp(event: KeyboardEvent) {
    const isEnter =
      event.code === 'Enter' || event.key === 'Enter' || event.keyCode === 13;
    if (!isEnter) {
      return;
    }

    const input = event.target as HTMLInputElement;
    const navPath = input.value;
    this.navigate(navPath);
  }

  onPathBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    const navPath = input.value;
    this.navigate(navPath);
  }

  public async goBack() {
    const parentFolder = await this.parentFolder.pipe(take(1)).toPromise();
    this.router.navigate([encodeURIComponent(parentFolder)]);
  }

  public reload() {
    this.fileSystemService.reScanFs();
  }
}
