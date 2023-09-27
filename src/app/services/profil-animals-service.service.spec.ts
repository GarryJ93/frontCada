import { TestBed } from '@angular/core/testing';

import { ProfilAnimalsServiceService } from './profil-animals-service.service';

describe('ProfilAnimalsServiceService', () => {
  let service: ProfilAnimalsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilAnimalsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
