import { TestBed } from '@angular/core/testing';

import { ConversionWayService } from './conversion-way.service';

describe('ConversionWayService', () => {
  let service: ConversionWayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversionWayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
