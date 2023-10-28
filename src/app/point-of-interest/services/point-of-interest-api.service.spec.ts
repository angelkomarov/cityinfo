import { TestBed } from '@angular/core/testing';

import { PointOfInterestApiService } from './point-of-interest-api.service';

describe('PointOfInterestApiService', () => {
  let service: PointOfInterestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointOfInterestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
