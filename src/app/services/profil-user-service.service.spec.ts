import { TestBed } from '@angular/core/testing';

import { ProfilUserServiceService } from './profil-user-service.service';

describe('ProfilUserServiceService', () => {
  let service: ProfilUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
