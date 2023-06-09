import { TestBed } from '@angular/core/testing';

import { CanLeaveServiceService } from './can-leave-service.service';

describe('CanLeaveServiceService', () => {
  let service: CanLeaveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanLeaveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
