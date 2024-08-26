import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleMainComponent } from './wordle-main.component';

describe('WordleMainComponent', () => {
  let component: WordleMainComponent;
  let fixture: ComponentFixture<WordleMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordleMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
