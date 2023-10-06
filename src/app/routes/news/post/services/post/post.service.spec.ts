import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
