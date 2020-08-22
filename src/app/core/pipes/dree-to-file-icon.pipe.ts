import { Pipe, PipeTransform } from '@angular/core';
import { Dree } from 'dree';

@Pipe({ name: 'dreeToFileIcon' })
export class DreeToFileIcon implements PipeTransform {
  private fileIconPrepend = 'fiv-icon-';
  transform(dree: Dree): string {
    if (dree.type === 'directory') {
      return `${this.fileIconPrepend}folder`;
    }

    if (!dree.extension) {
      return `${this.fileIconPrepend}blank`;
    }

    return `${this.fileIconPrepend}${dree.extension}`;
  }
}
