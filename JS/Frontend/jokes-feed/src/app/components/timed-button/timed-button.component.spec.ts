import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimedButtonComponent } from './timed-button.component';

describe('TimedButtonComponent', () => {
  let component: TimedButtonComponent;
  let fixture: ComponentFixture<TimedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimedButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
