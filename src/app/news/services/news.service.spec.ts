import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NewsService} from './news.service';
import {FireBaseService} from "../../services/fire-base.service";
import {provideMock} from "../../../test/provideMock";
import {mock, verify, when} from "ts-mockito";
import {database} from "firebase";
import createSpy = jasmine.createSpy;

describe('NewsService', () => {
  let fireBaseService: FireBaseService;
  let database: database.Database;
  let service: NewsService;

  beforeEach(() => {
    fireBaseService = mock(FireBaseService);

    TestBed.configureTestingModule({
      providers: [NewsService, provideMock(fireBaseService, FireBaseService)]
    });
  });

  beforeEach(() => {
    database = {
      refFromURL: createSpy().and.callFake(() => {
        return {
          once() {
            return Promise.resolve({
              val() {
                return [1, 2, 3];
              }
            });
          }
        }
      }),
    } as any;

    when(fireBaseService.getDatabase()).thenReturn(database);

    service = TestBed.get(NewsService);
  });

  it('should be created', () => {
    expect(service.db).toBe(database);
  });

  describe('getNewsListIds', () => {
    it('should return promise with ids list', fakeAsync(() => {
      let result: number[] = [];

      service.getNewsListIds().then(ids => {
        result = ids;
      });
      tick();

      expect(result).toEqual([1, 2, 3]);
    }));
  });

  describe('loadNewsItems', () => {
    it('should request items by received ids', () => {
      service.loadNewsItems([1, 2]);

      expect(service.db.refFromURL).toHaveBeenCalledTimes(2);
      expect(service.db.refFromURL).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/item/1');
      expect(service.db.refFromURL).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/item/2');
    });
  });
});
