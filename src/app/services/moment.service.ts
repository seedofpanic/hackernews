import {Injectable} from '@angular/core';
import {unix} from "moment";

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() {
  }

  unix(value: number) {
    return unix(value);
  }
}
