import { TestBed } from '@angular/core/testing';

import { AuthServiceSeller  } from './auth-seller.service';

describe('AuthSellerService', () => {
  let service: AuthServiceSeller;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceSeller);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
