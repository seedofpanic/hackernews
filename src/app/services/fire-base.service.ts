import {Injectable} from '@angular/core';
import {database, initializeApp} from "firebase/app";
import "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  constructor() {
  }

  getDatabase() {
    return database();
  }

  doInitializeApp(options: any) {
    return initializeApp(options);
  }
}
