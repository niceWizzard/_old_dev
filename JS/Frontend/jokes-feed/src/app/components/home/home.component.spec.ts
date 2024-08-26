import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from 'immutable';
import { Observable, of } from 'rxjs';
import { JokeGetterService, JokeRequestConfig } from 'src/app/services/joke-getter.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const jokeGetterService = {
      cachedJokes: List([1,2]),
      addJoke:  (config: JokeRequestConfig ) => of({
        jokes: [
          {
            id: 1,
            content: "HAHAH",
            flags: {nsfw: false, },
            safe: false,

          }
        ]
      })
    };
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ 
        {
          provide: JokeGetterService,
          useValue: jokeGetterService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
