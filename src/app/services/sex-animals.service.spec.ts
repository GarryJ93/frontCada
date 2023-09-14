import { TestBed } from '@angular/core/testing';

import { SexAnimalsService } from './sex-animals.service';

describe('SexAnimalsService', () => {
  let service: SexAnimalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SexAnimalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
