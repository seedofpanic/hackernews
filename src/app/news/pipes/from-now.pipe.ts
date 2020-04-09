import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {MomentService} from "../../services/moment.service";

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  constructor(private moment: MomentService) {
  }

  transform(value: number): any {
    return this.moment.unix(value).fromNow();
  }

}
