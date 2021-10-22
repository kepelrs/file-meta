import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DatabaseService } from './core/db/database.service';
import { Router } from '@angular/router';
import { FileSystemService } from './core/state/file-system.service';
import { FileSystemQuery } from './core/state/file-system.query';
import { AppLanguage } from './core/types';
import { SELECTED_LANGUAGE } from './core/constants';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  languages: AppLanguage[] = ['en', 'pt'];
  selectedLanguage: AppLanguage = (window.localStorage.getItem(
    SELECTED_LANGUAGE
  ) || 'en') as AppLanguage;

  constructor(
    private router: Router,
    private fileSystemQuery: FileSystemQuery,
    private translocoService: TranslocoService
  ) {}

  async ngOnInit() {
    this.translocoService.setActiveLang(this.selectedLanguage);
  }

  get pageTitle() {
    if (this.router.url.startsWith('/search')) {
      return 'metadata-search';
    }
    return 'navigator';
  }

  onLanguageChange(language: AppLanguage) {
    window.localStorage.setItem(SELECTED_LANGUAGE, language);
    this.translocoService.setActiveLang(language);
  }

  toFileNavigator() {
    this.router.navigateByUrl(
      `/${encodeURIComponent(this.fileSystemQuery.getValue().folderPath)}`
    );
  }

  toSearch() {
    this.router.navigateByUrl(`/search`);
  }
}
