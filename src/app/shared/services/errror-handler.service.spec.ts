import { TestBed } from '@angular/core/testing';

import { ErrrorHandlerService } from './errror-handler.service';

describe('ErrrorHandlerService', () => {
  let service: ErrrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
