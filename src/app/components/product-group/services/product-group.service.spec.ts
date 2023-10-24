import { TestBed } from '@angular/core/testing';

import { ProductGroupService } from './product-group.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

describe('ProductGroupService', () => {
  let service: ProductGroupService;
  let angularFirestoreMock: any;

  beforeEach(() => {
    angularFirestoreMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [{provide: FirestoreService, useValue: angularFirestoreMock}]
    });
    service = TestBed.inject(ProductGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
