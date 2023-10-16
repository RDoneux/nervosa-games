import { TestBed } from '@angular/core/testing';

import { CreatePostService } from './create-post.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';

describe('CreatePostService', () => {
  let service: CreatePostService;
  let angularFirestoreServiceMock: any

  beforeEach(() => {
    angularFirestoreServiceMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: angularFirestoreServiceMock },
      ],
    });
    service = TestBed.inject(CreatePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
