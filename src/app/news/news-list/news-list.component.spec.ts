import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NewsListComponent} from './news-list.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NewsService} from "../services/news.service";
import {provideMock} from "../../../test/provideMock";
import {deepEqual, mock, verify, when} from "ts-mockito";
import {FireBaseService} from "../../services/fire-base.service";

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let element: HTMLElement;

  let newsServiceMock: NewsService;
  let fireBaseService: FireBaseService;

  beforeEach(async(() => {
    newsServiceMock = mock(NewsService);
    fireBaseService = mock(FireBaseService);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewsListComponent],
      providers: [
        provideMock(newsServiceMock, NewsService),
        provideMock(fireBaseService, FireBaseService),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    when(newsServiceMock.getNewsListIds()).thenReturn(Promise.resolve([]));

    const newsService = TestBed.get(NewsService);
    newsService.items = [];

    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request news list onInit once', () => {
    verify(newsServiceMock.getNewsListIds()).once();
  });

  it('should draw items for each id received', fakeAsync(() => {
    when(newsServiceMock.getNewsListIds()).thenReturn(Promise.resolve([1, 2, 3, 4]));
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const itemsElements = element.querySelectorAll('.item');

    expect(itemsElements.length).toBe(4);
  }));

  it('should request data for items with received ids', fakeAsync(() => {
    when(newsServiceMock.getNewsListIds()).thenReturn(Promise.resolve([1, 2]));
    component.ngOnInit();
    tick();

    verify(newsServiceMock.loadNewsItems(deepEqual([1, 2]))).once();
  }));

  describe('trackBy', () => {
    it('should track by element it self', () => {
      expect(component.trackBy(0, 3)).toBe(3);
    });
  });

  describe('onHide', () => {
    it('should hide element', fakeAsync(() => {
      when(newsServiceMock.getNewsListIds()).thenReturn(Promise.resolve([1, 2, 3, 4]));
      component.ngOnInit();
      tick();
      fixture.detectChanges();

      let itemsElements = element.querySelectorAll('.item');

      expect(itemsElements.length).toBe(4);

      component.onHide(2);
      fixture.detectChanges();

      itemsElements = element.querySelectorAll('.item');
      expect(itemsElements.length).toBe(3);
    }));
  });
});
