import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'names',
})
export class NamesPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const names = value.split(' ');
    return names.map(name => {
      if (name.length > 1) {
        return name[0] + '*'.repeat(name.length - 1);
      }
      return name;
    }).join(' ');
  }

}
