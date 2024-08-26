import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeComponent } from './joke.component';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;

    component.joke = {
      category: "Misc",
      content: "Hello",
      flags: {
        explicit: false,
        nsfw: false,
        political: false,
        racist: false,
        religious: false,
        sexist: false,
      },
      id: 1,
      safe: true,
      type: "single"
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
