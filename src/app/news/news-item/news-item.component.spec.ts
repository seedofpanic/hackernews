import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsItemComponent} from './news-item.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TakeDomenPipe} from "../pipes/take-domen.pipe";
import {FromNowPipe} from "../pipes/from-now.pipe";
import {take} from "rxjs/operators";
import {NewsItem} from "../models/newsItem";

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewsItemComponent, TakeDomenPipe, FromNowPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not draw elements if there is no item', () => {
    component.item = undefined;
    fixture.detectChanges();

    expect(element.childElementCount).toBe(0);
  });

  describe('with item', () => {
    beforeEach(() => {
      component.item = {} as NewsItem;
      fixture.detectChanges();
    });

    it('should add and remove the class of like icon on click', () => {
      const likeElement = element.querySelector('.like');

      expect(likeElement.classList.contains('liked')).toBe(false, 'has class by default');

      likeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(likeElement.classList.contains('liked')).toBe(true, 'class was not set');

      likeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(likeElement.classList.contains('liked')).toBe(false, 'class was not removed');
    });

    it('should not show more button if more text is empty', () => {
      component.item.text = ' ';
      fixture.detectChanges();

      expect(element.querySelector('.more-button')).toBeNull('more button was not hidden');
    });

    it('should be possible to toggle more info on item', () => {
      component.item.text = '<div>test</div>';
      fixture.detectChanges();

      const moreButtonElement = element.querySelector('.more-button');

      moreButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(element.querySelector('.more-button')).toBeNull('more button was not hidden');
      expect(element.querySelector('.more-text').innerHTML).toBe('<div>test</div>', 'more text is not correctly inserted');

      const lessButtonElement = element.querySelector('.less-button');

      lessButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(element.querySelector('.more-button')).toBeDefined('more button not found');
      expect(element.querySelector('.more-text')).toBeDefined('more text found');
      expect(element.querySelector('.less-button')).toBeDefined('less button found');
    });

    it('should emit event when cross is clicked', () => {
      const crossElement = element.querySelector('.cross');
      let fired = false;

      component.hide
        .pipe(take(1))
        .subscribe(() => {
          fired = true;
        });

      crossElement.dispatchEvent(new Event('click'));

      expect(fired).toBe(true);
    });

    it('check title text', () => {
      component.item.title = 'test title';
      component.item.url = 'http://test.google.com/';
      fixture.detectChanges();

      const titleTextElement = element.querySelector('.title-text');

      expect(titleTextElement.textContent.trim()).toMatch(/test\stitle\s\(test.google.com\)/);
    });

    it('check subtitle text', () => {
      component.item.score = 123;
      component.item.by = 'testUser';
      component.item.time = 1586422464;
      component.item.kids = [1, 2, 3];
      fixture.detectChanges();

      const subTitleTextElement = element.querySelector('.subtitle-text');

      expect(subTitleTextElement.textContent.trim())
        .toMatch(/123\spoints,\sby\stestUser,\s7\shours\sago\s|\s3\scomments/);
    });

    it('check subtitle comments singular', () => {
      component.item.score = 123;
      component.item.by = 'testUser';
      component.item.time = 1586422464;
      component.item.kids = [1];
      fixture.detectChanges();

      const titleTextElement = element.querySelector('.subtitle-text');

      expect(titleTextElement.textContent.trim())
        .toMatch(/123\spoints,\sby\stestUser,\s7\shours\sago\s|\s1\scomment/);
    });
  });
});
