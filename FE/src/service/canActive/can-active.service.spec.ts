import { TestBed } from '@angular/core/testing';

import { CanActiveService } from './can-active.service';

describe('CanActiveService', () => {
  let service: CanActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
