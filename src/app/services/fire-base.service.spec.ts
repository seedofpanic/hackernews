import {TestBed} from '@angular/core/testing';

import {FireBaseService} from './fire-base.service';

const DB_ERROR = 'FIREBASE FATAL ERROR: Can\'t determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.initializeApp(). ';

describe('FireBaseService', () => {
  let service: FireBaseService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(FireBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should try to initialize firebase connection', () => {
    expect(service.doInitializeApp({})).toBeDefined();
    expect(() => service.getDatabase().refFromURL).toThrowError(DB_ERROR);
  });
});
