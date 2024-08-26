import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMessageComponent } from './game-message.component';

describe('GameMessageComponent', () => {
  let component: GameMessageComponent;
  let fixture: ComponentFixture<GameMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
