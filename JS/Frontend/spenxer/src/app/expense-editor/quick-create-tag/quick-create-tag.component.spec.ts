import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCreateTagComponent } from './quick-create-tag.component';

describe('QuickCreateTagComponent', () => {
  let component: QuickCreateTagComponent;
  let fixture: ComponentFixture<QuickCreateTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickCreateTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCreateTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
