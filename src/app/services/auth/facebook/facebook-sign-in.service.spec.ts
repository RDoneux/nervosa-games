import { TestBed } from '@angular/core/testing';

import { FacebookSignInService } from './facebook-sign-in.service';

describe('FacebookSignInService', () => {
  let service: FacebookSignInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookSignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
