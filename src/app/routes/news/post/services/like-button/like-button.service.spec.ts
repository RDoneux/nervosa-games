import { TestBed } from '@angular/core/testing';

import { LikeButtonService } from './like-button.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LikeButtonService', () => {
  let service: LikeButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    service = TestBed.inject(LikeButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
