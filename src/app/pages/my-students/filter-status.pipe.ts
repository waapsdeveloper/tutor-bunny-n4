import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {
  transform(items: any[], statusToExclude: string): any[] {
    if (!items || !statusToExclude) {
      return items;
    }
    return items.filter(item => item?.status !== statusToExclude);
  }
}
