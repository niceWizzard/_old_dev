import { TestBed } from '@angular/core/testing';

import { GameEventsEmitterService } from './game-events-emitter.service';

describe('GameEventsEmitterService', () => {
  let service: GameEventsEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEventsEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
