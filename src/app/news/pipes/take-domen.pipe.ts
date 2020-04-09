import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'takeDomen'
})
export class TakeDomenPipe implements PipeTransform {

  transform(value: string): any {
    const match = value ? value.match(/\/\/(www\.|)(.*?)\//) : '';
    return match ? match[2] : '';
  }

}
