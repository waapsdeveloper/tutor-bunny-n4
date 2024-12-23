import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPending',
  standalone: true
})
export class FilterPendingPipe implements PipeTransform {

  transform(items: any[], status: string): any[] {
    if (!items || !status) {
      return items;
    }
    return items.filter(item => item.status === status);
  }

}
