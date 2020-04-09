import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FrameComponent} from './frame.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FrameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
