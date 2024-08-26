import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { JokeGetterService } from './joke-getter.service';

describe('JokeGetterService', () => {
  let service: JokeGetterService;

  beforeEach(() => {
    const stud = {

    }
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: stud,
        },
      ]
    });
    service = TestBed.inject(JokeGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
