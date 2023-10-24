import { TestBed } from '@angular/core/testing';

import { CreateProductService } from './create-product.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

describe('CreateProductService', () => {
  let service: CreateProductService;
  let angularFirestoreMock: any;

  beforeEach(() => {
    angularFirestoreMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: angularFirestoreMock },
      ],
    });
    service = TestBed.inject(CreateProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
