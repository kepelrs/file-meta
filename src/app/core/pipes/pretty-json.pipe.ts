import { Pipe, PipeTransform } from '@angular/core';

/**
 * Usage
 * <pre>{{ count | json }}</pre>
 */
@Pipe({ name: 'prettyJson', pure: false })
export class PrettyJsonPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}
