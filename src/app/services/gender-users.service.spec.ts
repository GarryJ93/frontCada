import { TestBed } from '@angular/core/testing';

import { GenderUserService } from './gender-users.service';

describe('GenderUserService', () => {
  let service: GenderUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
