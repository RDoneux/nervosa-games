import { TestBed } from '@angular/core/testing';

import { GoogleSignInService } from './google-sign-in.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('GoogleSignInService', () => {
  let service: GoogleSignInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    service = TestBed.inject(GoogleSignInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
