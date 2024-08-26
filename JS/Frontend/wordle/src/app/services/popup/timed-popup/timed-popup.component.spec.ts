import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimedPopupComponent } from './timed-popup.component';

describe('TimedPopupComponent', () => {
  let component: TimedPopupComponent;
  let fixture: ComponentFixture<TimedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
